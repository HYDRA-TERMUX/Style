# HYDRA Script Obfuscator & Deobfuscator v2.0

```
██╗  ██╗██╗   ██╗██████╗ ██████╗  ██╗
██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗███║
███████║ ╚████╔╝ ██║  ██║██████╔╝╚██║
██╔══██║  ╚██╔╝  ██║  ██║██╔══██╗ ██║
██║  ██║   ██║   ██████╔╝██║  ██║ ██║
╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝ ╚═╝

Multi-Layer Protection System
Created by: HYDRA
```

A powerful multi-layer script protection system designed for Termux. Protect your bash scripts from casual viewing and make reverse engineering extremely difficult.

---

## 🔥 Features

- **HYDRA Branding**: Custom branded interface with ASCII art logo
- **3-Tier Protection System**: 
  - Basic (3 layers) - Fast, lightweight
  - Advanced (5 layers) - Recommended for most use cases
  - Ultra (7+ layers) - Maximum security, military-grade
- **Multiple Encoding Layers**: 
  - Base64 encoding
  - Hexadecimal encoding
  - ROT13 Caesar cipher
  - Reverse string obfuscation
- **Random Variable Names**: All variables prefixed with "HYDRA_" + 8 random characters
- **Anti-Tampering Protection**: Built-in integrity checks
- **Deobfuscator Included**: Reverse your own protected scripts when needed
- **Auto-Detection**: Deobfuscator automatically detects protection level
- **Easy to Use**: Interactive menu-driven interface
- **Termux Optimized**: Works perfectly in Android/Termux environment

---

## 📦 Installation

1. Download both scripts to your Termux environment:
   - `hydra_obfuscator.sh` - Protection tool
   - `hydra_deobfuscator.sh` - Recovery tool

2. Make them executable:
```bash
chmod +x hydra_obfuscator.sh hydra_deobfuscator.sh
```

---

## 🚀 Usage

### HYDRA Obfuscator

**Basic Usage:**
```bash
./hydra_obfuscator.sh <input_script> [output_script]
```

**Examples:**

1. **Auto-generated output name:**
```bash
./hydra_obfuscator.sh myscript.sh
```
This creates `myscript_hydra.sh`

2. **Custom output name:**
```bash
./hydra_obfuscator.sh myscript.sh protected.sh
```

3. **Interactive Mode:**
When you run the obfuscator, you'll see the HYDRA banner and be prompted to choose:
```
[HYDRA] Select Protection Level:
  1) Basic Protection (3 Layers - Fast)
  2) Advanced Protection (5 Layers - Recommended)
  3) Ultra Protection (7+ Layers - Maximum Security)

[HYDRA] Enter choice [1-3]:
```

### HYDRA Deobfuscator

**Basic Usage:**
```bash
./hydra_deobfuscator.sh <obfuscated_script> [output_script]
```

**Examples:**

1. **Deobfuscate with auto-detection:**
```bash
./hydra_deobfuscator.sh protected_hydra.sh
```
This creates `protected_deobfuscated.sh`

2. **Custom output name:**
```bash
./hydra_deobfuscator.sh protected_hydra.sh original.sh
```

The deobfuscator will **automatically detect** the protection level (Basic/Advanced/Ultra) and apply the correct reverse engineering process.

---

## 🛡️ Protection Levels Explained

### 1. Basic Protection (3 Layers)
**Process:**
1. Base64 encode entire script
2. Reverse the string
3. Base64 encode again

**Use Cases:**
- Quick protection for simple scripts
- When file size matters
- When you need fast obfuscation/deobfuscation

**Security Level:** ⭐⭐☆☆☆

---

### 2. Advanced Protection (5 Layers) ⭐ RECOMMENDED
**Process:**
1. Base64 encode
2. Hexadecimal encode
3. Reverse the string
4. ROT13 cipher
5. Final Base64 encode

**Additional Features:**
- Anti-debugging code injection
- Tampering detection
- Junk variables for confusion

**Use Cases:**
- Protecting API keys and secrets
- Commercial scripts
- Scripts with sensitive logic

**Security Level:** ⭐⭐⭐⭐☆

---

### 3. Ultra Protection (7+ Layers) 🔒 MAXIMUM
**Process:**
1. Base64 encode
2. ROT13 cipher
3. Reverse the string
4. Hexadecimal encode
5. Base64 encode
6. Reverse again
7. Final Base64 encode

**Additional Features:**
- Multiple integrity checks
- Decoy code injection
- Hash verification simulation
- Anti-tampering warnings
- Maximum variable obfuscation

**Use Cases:**
- Highly sensitive scripts
- Proprietary algorithms
- Maximum security requirements
- When reverse engineering must be prevented

**Security Level:** ⭐⭐⭐⭐⭐

---

## 💡 How It Works

### Obfuscation Example

**Original Script (example.sh):**
```bash
#!/bin/bash
echo "Hello HYDRA!"
API_KEY="secret_key_12345"
echo "API: $API_KEY"
```

**After Basic Obfuscation:**
```bash
#!/data/data/com.termux/files/usr/bin/bash
#═══════════════════════════════════════
# Protected by HYDRA Obfuscator v2.0
# HYDRA Multi-Layer Protection Active
#═══════════════════════════════════════
HYDRA_K8F3N2Q1=$((RANDOM % 9999))
HYDRA_M7P2X9W4='IyEvYmluL2Jhc2gKZWNobyAiSGVsbG8gSFlEUkEhIgpBUElfS0VZPSJ...'
HYDRA_R5T8N3K6=$(echo "${HYDRA_M7P2X9W4}" | base64 -d)
HYDRA_Q9L4M7P2=$(echo "${HYDRA_R5T8N3K6}" | rev)
HYDRA_Z3X8K5N1=$(echo "${HYDRA_Q9L4M7P2}" | base64 -d)
# HYDRA Protection: Do not modify below this line
eval "${HYDRA_Z3X8K5N1}"
# HYDRA_SIGNATURE_END
```

---

## 🎯 Use Cases

### ✅ What HYDRA Protects Against:
- Casual code reading and copying
- Quick glances at sensitive information
- Automated keyword scanning
- Basic script analysis
- Copy-paste theft
- Source code exposure

### ⚠️ What HYDRA Does NOT Protect Against:
- Determined professional reverse engineering
- Advanced deobfuscation tools (without the HYDRA deobfuscator)
- Runtime debugging
- Memory analysis
- Expert cryptanalysis

---

## 📝 Best Practices

### DO:
✅ Always keep an unobfuscated backup of your original script  
✅ Test the obfuscated script before deploying  
✅ Use Advanced or Ultra mode for sensitive scripts  
✅ Combine with file permissions for added security  
✅ Document which protection level you used  
✅ Use the deobfuscator only when you need to modify the script  

### DON'T:
❌ Don't lose your original script (you'll need it for updates)  
❌ Don't share both obfuscated and deobfuscator with untrusted users  
❌ Don't rely solely on obfuscation for critical security  
❌ Don't obfuscate scripts that self-modify  
❌ Don't expect this to stop expert reverse engineers  

---

## 🔧 Technical Details

### Variable Naming Convention
All obfuscated variables follow the pattern:
```
HYDRA_[8 random alphanumeric characters]
```
Example: `HYDRA_K7M3P9X2`

### File Size Impact
- **Basic**: ~30% larger than original
- **Advanced**: ~40-50% larger than original
- **Ultra**: ~50-60% larger than original

### Performance Impact
- **Basic**: Minimal (few milliseconds)
- **Advanced**: Low (< 100ms for most scripts)
- **Ultra**: Moderate (< 200ms for most scripts)

### Dependencies
All required tools are standard in Termux:
- `base64` - For Base64 encoding/decoding
- `xxd` - For hexadecimal conversion
- `rev` - For string reversal
- `tr` - For character transformation (ROT13)

---

## 🐛 Troubleshooting

### Script doesn't run after obfuscation:
1. Verify original script works: `./original.sh`
2. Check file permissions: `chmod +x obfuscated.sh`
3. Ensure all dependencies are installed

### Deobfuscation fails:
1. Verify file was obfuscated with HYDRA (check for signature)
2. Ensure file hasn't been manually modified
3. Check that encoded payload is intact

### "Tampering detected" error:
- The obfuscated file has been modified
- Use the original unmodified obfuscated file
- Or deobfuscate and re-obfuscate

---

## 📊 Comparison Table

| Feature | Basic | Advanced | Ultra |
|---------|-------|----------|-------|
| Layers | 3 | 5 | 7+ |
| Speed | ⚡⚡⚡ | ⚡⚡ | ⚡ |
| Security | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| File Size | +30% | +45% | +55% |
| Anti-Tampering | ❌ | ✅ | ✅✅ |
| Integrity Check | ❌ | ✅ | ✅✅ |
| Junk Code | ❌ | ✅ | ✅✅ |

---

## 🎓 Example Workflow

```bash
# 1. Create your script
nano myscript.sh

# 2. Make it executable
chmod +x myscript.sh

# 3. Test it works
./myscript.sh

# 4. Obfuscate with HYDRA (Advanced level)
./hydra_obfuscator.sh myscript.sh
# Choose option 2 (Advanced)

# 5. Test obfuscated version
./myscript_hydra.sh

# 6. Later, if you need to modify...
./hydra_deobfuscator.sh myscript_hydra.sh

# 7. Edit the deobfuscated version
nano myscript_deobfuscated.sh

# 8. Re-obfuscate
./hydra_obfuscator.sh myscript_deobfuscated.sh myscript_hydra.sh
```

---

## 🔐 Security Notice

⚠️ **IMPORTANT**: This obfuscator provides **protection against casual viewing** and makes reverse engineering **more difficult**, but it is NOT cryptographic security.

**What it's good for:**
- Hiding API keys from casual viewers
- Protecting proprietary logic from copy-paste theft
- Adding a deterrent layer to your scripts
- Educational purposes

**What it's NOT good for:**
- Protecting highly sensitive cryptographic keys
- Preventing determined attackers
- Replacing proper security measures
- Compliance with security regulations requiring encryption

---

## 📜 License

Free to use and modify for personal and educational purposes.

**Created by: HYDRA**

---

## ⚡ Quick Reference

```bash
# Obfuscate (Basic)
./hydra_obfuscator.sh script.sh          # Choose 1

# Obfuscate (Advanced)
./hydra_obfuscator.sh script.sh          # Choose 2

# Obfuscate (Ultra)
./hydra_obfuscator.sh script.sh          # Choose 3

# Deobfuscate (Auto-detect)
./hydra_deobfuscator.sh protected.sh
```

---

## 🌟 Tips for Maximum Protection

1. **Combine protection methods**: Use Ultra obfuscation + file permissions
2. **Regular rotation**: Re-obfuscate periodically with new random variables
3. **Split sensitive data**: Don't put all secrets in one script
4. **Use environment variables**: Store ultra-sensitive data outside the script
5. **Add decoy code**: Mix in fake API keys or functions before obfuscating
6. **Never share deobfuscator**: Keep it private if distributing obfuscated scripts

---

**Remember**: Security is layers. HYDRA adds a significant layer, but always use multiple security measures for critical applications.

---

## 📞 Support

For issues, improvements, or questions, remember:
- Keep your original scripts safe
- Test thoroughly before deployment
- HYDRA protects, but you secure

**Stay Protected. Stay HYDRA. 🐍**