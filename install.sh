git clone #!/bin/bash

# Define filenames and paths
ZIP_FILE="corefiles.zip"
EXTRACT_FOLDER="corefiles"
HIDDEN_FOLDER=".corefiles"
BIN_PATH="$PREFIX/bin/FIX"

# Check if the ZIP file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "❌ Error: $ZIP_FILE not found!"
    exit 1
    fi
    
    # Remove existing folders/files if they already exist
    [ -d "$HIDDEN_FOLDER" ] && rm -rf "$HIDDEN_FOLDER"
    [ -f "$BIN_PATH" ] && rm -f "$BIN_PATH"
    
    # Extract corefiles.zip
    unzip -o "$ZIP_FILE" -d "$EXTRACT_FOLDER"
    
    # Check if extraction was successful
    if [ ! -d "$EXTRACT_FOLDER" ]; then
        echo "❌ Error: Extraction failed!"
        exit 1
        fi
        
        # Rename corefiles to .corefiles (hidden)
        mv "$EXTRACT_FOLDER" "$HIDDEN_FOLDER"
        
        # Move '1' to $PREFIX/bin and rename it to 'FIX'
        if [ -f "$HIDDEN_FOLDER/1" ]; then
            [ -f "$BIN_PATH" ] && rm -f "$BIN_PATH"  # Remove existing FIX if needed
            mv "$HIDDEN_FOLDER/1" "$BIN_PATH"
            chmod +x "$BIN_PATH"
            fi
            
            # Rename '2.sh' to 'RUN.sh'
            if [ -f "$HIDDEN_FOLDER/2.sh" ]; then
                [ -f "$HIDDEN_FOLDER/RUN.sh" ] && rm -f "$HIDDEN_FOLDER/RUN.sh"  # Remove existing RUN.sh if needed
                mv "$HIDDEN_FOLDER/2.sh" "$HIDDEN_FOLDER/RUN.sh"
                fi
                
                # Remove corefiles.zip after extraction
                rm -f "$ZIP_FILE"
                
                echo "✅ Setup completed successfully!"
                
