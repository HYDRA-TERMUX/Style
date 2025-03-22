#!/bin/bash

# Define paths and filenames
ZIP_FILE="corefiles.zip"
EXTRACT_FOLDER=".corefiles"
TARGET_FOLDER="$HOME/Style"

# Ensure the script runs inside Termux
if [ -z "$HOME" ]; then
    echo "❌ Error: This script must be run inside a Unix-based environment."
    exit 1
fi

# Check if corefiles.zip exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "❌ Error: $ZIP_FILE not found!"
    exit 1
fi

# Remove existing directories and files if they exist
echo "🔄 Cleaning up old files..."
rm -rf "$EXTRACT_FOLDER" "$TARGET_FOLDER/style" "$TARGET_FOLDER/.RUN.sh"

# Extract corefiles.zip into .corefiles (hidden folder)
echo "📦 Extracting $ZIP_FILE..."
unzip -o "$ZIP_FILE" -d "$EXTRACT_FOLDER"

# Check if extraction was successful
if [ ! -d "$EXTRACT_FOLDER" ]; then
    echo "❌ Error: Extraction failed!"
    exit 1
fi

# Ensure the target folder exists
mkdir -p "$TARGET_FOLDER"

# Move FIX to $HOME/Style and rename to style
if [ -f "$EXTRACT_FOLDER/FIX" ]; then
    mv "$EXTRACT_FOLDER/FIX" "$TARGET_FOLDER/style"
    chmod +x "$TARGET_FOLDER/style"
    echo "✅ Installed 'style' successfully!"
else
    echo "⚠️ Warning: 'FIX' file not found inside corefiles!"
fi

# Move RUN.sh to $HOME/Style and rename to .RUN.sh
if [ -f "$EXTRACT_FOLDER/RUN.sh" ]; then
    mv "$EXTRACT_FOLDER/RUN.sh" "$TARGET_FOLDER/.RUN.sh"
    echo "✅ Installed '.RUN.sh' successfully!"
else
    echo "⚠️ Warning: 'RUN.sh' file not found inside corefiles!"
fi

# Remove corefiles.zip after extraction
rm -f "$ZIP_FILE"

echo "🎉 Installation completed successfully!"
