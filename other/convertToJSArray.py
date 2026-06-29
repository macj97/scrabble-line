# File: convertToJSArray.py
# GUI Assignment: HW5 - Implementing a bit of Scrabble with drag-and-drop
# Description: Python program used to convert dictionary text list into javascript array of strings
# Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
# Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.

import json
from pathlib import Path

# Input and output file paths
input_file = Path("twl06.txt")
output_file = Path("scrabble-words.js")

try:
    # Read the text file
    with input_file.open("r", encoding="utf-8") as f:
        words = [line.strip() for line in f if line.strip()]

    # Create JavaScript file content
    js_content = "// Auto-generated Scrabble word list\n"
    js_content += "window.scrabbleWords = " + json.dumps(words, indent=2) + ";\n"

    # Write to output file
    with output_file.open("w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"✅ Converted {len(words)} words into {output_file}")
except FileNotFoundError:
    print(f"Error: {input_file} not found.")
except Exception as e:
    print(f"Error: {e}")
