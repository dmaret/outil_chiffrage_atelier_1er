#!/bin/bash

# 🔄 Backup Database to Network Drive
# Usage: ./backup.sh
# Or: ./backup.sh /Volumes/MyNetworkDrive/backups

set -e

NETWORK_DRIVE="${1:-.}"
BACKUP_DIR="$NETWORK_DRIVE/atelier_backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_FILE="atelier.db"
BACKUP_FILE="$BACKUP_DIR/atelier_$TIMESTAMP.db"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup SQLite database
if [ -f "$DB_FILE" ]; then
    cp "$DB_FILE" "$BACKUP_FILE"
    echo "✅ Database backed up to: $BACKUP_FILE"
else
    echo "⚠️  Database file not found: $DB_FILE"
    exit 1
fi

# Keep only last 30 backups (cleanup old files)
find "$BACKUP_DIR" -name "atelier_*.db" -type f | sort -r | tail -n +31 | xargs -r rm
echo "🧹 Cleanup: kept last 30 backups"

# Optional: backup to PostgreSQL dump if using PostgreSQL
if command -v pg_dump &> /dev/null; then
    DB_NAME="${DB_NAME:-atelier_db}"
    DB_USER="${DB_USER:-postgres}"
    PG_BACKUP="$BACKUP_DIR/atelier_pg_$TIMESTAMP.sql"

    if pg_dump "$DB_NAME" -U "$DB_USER" > "$PG_BACKUP" 2>/dev/null; then
        echo "✅ PostgreSQL dumped to: $PG_BACKUP"
    fi
fi

echo "✨ Backup complete!"
