document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.querySelector('.upload-btn');
    const compressBtn = document.getElementById('compressBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const originalImg = document.getElementById('originalImg');
    const compressedImg = document.getElementById('compressedImg');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const comparisonSection = document.getElementById('comparisonSection');
    const divider = document.getElementById('divider');
    
    let compressedBlob = null;
    let isDragging = false;
    
    // Initialize comparison slider
    function initComparisonSlider() {
        divider.addEventListener('mousedown', function(e) {
            isDragging = true;
            document.body.style.cursor = 'ew-resize';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const containerRect = document.querySelector('.comparison-container').getBoundingClientRect();
            let x = e.clientX - containerRect.left;
            
            // Keep within bounds
            x = Math.max(0, Math.min(x, containerRect.width));
            
            const percent = (x / containerRect.width) * 100;
            compressedImg.style.width = `${percent}%`;
            divider.style.left = `${percent}%`;
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.cursor = '';
        });
        
        // Touch support
        divider.addEventListener('touchstart', function(e) {
            isDragging = true;
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const containerRect = document.querySelector('.comparison-container').getBoundingClientRect();
            let x = e.touches[0].clientX - containerRect.left;
            
            // Keep within bounds
            x = Math.max(0, Math.min(x, containerRect.width));
            
            const percent = (x / containerRect.width) * 100;
            compressedImg.style.width = `${percent}%`;
            divider.style.left = `${percent}%`;
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    }
    
    initComparisonSlider();
    
    // Update quality display
    qualitySlider.addEventListener('input', function() {
        qualityValue.textContent = this.value;
    });
    
    // File input change
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Show original image
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImg.src = e.target.result;
                originalSize.textContent = `Original: ${formatFileSize(file.size)}`;
                
                // Enable compress button
                compressBtn.disabled = false;
                
                // Reset compressed image
                compressedImg.src = '';
                compressedSize.textContent = 'Compressed: --';
                downloadBtn.style.display = 'none';
                comparisonSection.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Compress image
    compressBtn.addEventListener('click', function() {
        if (!fileInput.files[0]) return;
        
        const file = fileInput.files[0];
        const quality = parseInt(qualitySlider.value) / 100;
        
        compressBtn.disabled = true;
        compressBtn.textContent = 'Compressing...';
        
        compressImage(file, quality)
            .then(result => {
                compressedBlob = result.blob;
                compressedImg.src = result.url;
                compressedSize.textContent = `Compressed: ${formatFileSize(result.blob.size)}`;
                downloadBtn.href = result.url;
                
                // Set download filename with appropriate extension
                const ext = result.format === 'image/webp' ? 'webp' : 'jpg';
                downloadBtn.download = `compressed.${ext}`;
                
                downloadBtn.style.display = 'inline-block';
                comparisonSection.style.display = 'block';
                compressBtn.textContent = 'Compress Image';
                compressBtn.disabled = false;
                
                // Reset slider position
                compressedImg.style.width = '50%';
                divider.style.left = '50%';
                
                // Adjust quality if needed to reach ~50KB
                if (result.blob.size > 55000) {
                    const newQuality = Math.max(10, quality * 0.9);
                    qualitySlider.value = Math.round(newQuality * 100);
                    qualityValue.textContent = Math.round(newQuality * 100);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error compressing image: ' + err.message);
                compressBtn.textContent = 'Compress Image';
                compressBtn.disabled = false;
            });
    });
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / 1048576).toFixed(2) + ' MB';
    }
    
    // Image compression function
    function compressImage(file, quality) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Calculate new dimensions
                    let width = img.width;
                    let height = img.height;
                    const maxDimension = 2000; // Max width/height
                    
                    if (width > height && width > maxDimension) {
                        height *= maxDimension / width;
                        width = maxDimension;
                    } else if (height > maxDimension) {
                        width *= maxDimension / height;
                        height = maxDimension;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convert to blob with target quality
                    canvas.toBlob(
                        blob => {
                            if (!blob) {
                                reject(new Error('Canvas toBlob failed'));
                                return;
                            }
                            
                            // If still too large, try WebP
                            if (blob.size > 55000 && file.type !== 'image/webp') {
                                canvas.toBlob(
                                    webpBlob => {
                                        if (!webpBlob) {
                                            resolve({
                                                blob: blob,
                                                url: URL.createObjectURL(blob),
                                                format: file.type
                                            });
                                            return;
                                        }
                                        resolve({
                                            blob: webpBlob,
                                            url: URL.createObjectURL(webpBlob),
                                            format: 'image/webp'
                                        });
                                    },
                                    'image/webp',
                                    quality
                                );
                            } else {
                                resolve({
                                    blob: blob,
                                    url: URL.createObjectURL(blob),
                                    format: file.type
                                });
                            }
                        },
                        file.type,
                        quality
                    );
                };
                img.onerror = () => reject(new Error('Image loading error'));
                img.src = event.target.result;
            };
            reader.onerror = () => reject(new Error('File reading error'));
            reader.readAsDataURL(file);
        });
    }
});
