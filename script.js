// Application state
let currentStep = 0;
let selectedCategory = ''; // This is correctly declared globally
let formData = {
    category: '',
    filmNameOriginal: '',
    filmNameTurkish: '',
    originalLanguage: '',
    producerCountry: '',
    duration: '',
    soundInfo: '',
    musicInfo: '',
    productionFormat: '',
    productionDate: '',
    filmSummary: '',
    downloadLink: '',
    downloadPassword: '',
    festivals: '',
    awards: '',
    socialMedia: '',
    imdbLink: '',
    directors: [],
    contractAccepted: false,
    kvkkAccepted: false
};

// Step configuration
const steps = [
    {
        title: 'Eser Linki ve Bilgileri',
        content: 'step1-content'
    },
    {
        title: 'Eser Sahibi Bilgileri',
        content: 'step2-content'
    },
    {
        title: 'Katılım Sözleşmesi',
        content: 'step3-content'
    },
    {
        title: 'Başvuru Özeti ve Onay',
        content: 'step4-content'
    }
];

// DOM elements - declare globally to avoid undefined references
let categorySelection, formSteps, stepTitle, stepContent, prevBtn, nextBtn;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    categorySelection = document.getElementById('category-selection');
    formSteps = document.getElementById('form-steps');
    stepTitle = document.getElementById('step-title');
    stepContent = document.getElementById('step-content');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');

    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Update progress steps
    updateProgressSteps();
});

function initializeEventListeners() {
    // Category selection
    const categoryOptions = document.querySelectorAll('input[name="category"]');
    categoryOptions.forEach(option => {
        option.addEventListener('change', handleCategoryChange);
    });

    // Start application button
    const startBtn = document.getElementById('start-application-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startApplication);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', previousStep);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }

    // Character count for film summary
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary) {
        filmSummary.addEventListener('input', updateCharacterCount);
    }
}

function handleCategoryChange(event) {
    selectedCategory = event.target.value; // Now this will work correctly
    
    // Update category display
    const categoryDisplay = document.getElementById('category-display');
    if (categoryDisplay) {
        const categoryTexts = {
            'profesyonel-belgesel': 'Profesyonel | Ulusal Belgesel Ödülleri Yarışması',
            'ogrenci-belgesel': 'Öğrenci | Ulusal Belgesel Ödülleri Yarışması',
            'international-competition': 'International Competition',
            'proje-destek': 'Proje Destek Yarışması'
        };
        categoryDisplay.value = categoryTexts[selectedCategory] || '';
    }

    // Update visual selection
    document.querySelectorAll('.category-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.closest('.category-option').classList.add('active');
}

function startApplication() {
    if (!selectedCategory) {
        alert('Lütfen bir kategori seçiniz.');
        return;
    }

    formData.category = selectedCategory;
    
    // Hide category selection and show form steps
    if (categorySelection) {
        categorySelection.style.display = 'none';
    }
    if (formSteps) {
        formSteps.style.display = 'block';
    }

    // Initialize first step
    currentStep = 0;
    showStep(currentStep);
}

function backToCategorySelection() {
    // Hide form steps and show category selection
    if (formSteps) {
        formSteps.style.display = 'none';
    }
    if (categorySelection) {
        categorySelection.style.display = 'block';
    }

    // Reset application state
    currentStep = 0;
    selectedCategory = '';
    
    // Reset form data
    formData = {
        category: '',
        filmNameOriginal: '',
        filmNameTurkish: '',
        originalLanguage: '',
        producerCountry: '',
        duration: '',
        soundInfo: '',
        musicInfo: '',
        productionFormat: '',
        productionDate: '',
        filmSummary: '',
        downloadLink: '',
        downloadPassword: '',
        festivals: '',
        awards: '',
        socialMedia: '',
        imdbLink: '',
        directors: [],
        contractAccepted: false,
        kvkkAccepted: false
    };

    // Clear category selection
    const categoryOptions = document.querySelectorAll('input[name="category"]');
    categoryOptions.forEach(option => {
        option.checked = false;
    });
    
    // Remove active class from category options
    document.querySelectorAll('.category-option').forEach(option => {
        option.classList.remove('active');
    });

    // Reset category display
    const categoryDisplay = document.getElementById('category-display');
    if (categoryDisplay) {
        categoryDisplay.textContent = 'Kategori seçilmedi';
    }

    // Reset progress steps
    updateProgressSteps();
}

function showStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= steps.length) return;

    currentStep = stepIndex;
    
    // Update step title
    if (stepTitle) {
        stepTitle.textContent = steps[stepIndex].title;
    }

    // Update step content based on step
    updateStepContent(stepIndex);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update progress steps
    updateProgressSteps();
}

function updateStepContent(stepIndex) {
    if (!stepContent) return;

    switch(stepIndex) {
        case 0:
            // Step 1 content is already in HTML
            break;
        case 1:
            stepContent.innerHTML = getStep2Content();
            initializeStep2();
            break;
        case 2:
            stepContent.innerHTML = getStep3Content();
            break;
        case 3:
            stepContent.innerHTML = getStep4Content();
            break;
    }
}

function getStep2StudentContent() {
    return `
        <div class="form-section">
            <h3 class="section-title">Yönetmen Bilgileri <span class="required">(Zorunlu)</span></h3>
            <div id="directors-container">
                <div class="director-form" data-director="0">
                    <div class="director-header">
                        <h4>1. Yönetmen</h4>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Ad</label>
                            <input type="text" class="form-input director-name" required>
                        </div>
                        <div class="form-group">
                            <label>Soyad</label>
                            <input type="text" class="form-input director-surname" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>E-posta</label>
                            <input type="email" class="form-input director-email" required>
                        </div>
                        <div class="form-group">
                            <label>Telefon</label>
                            <input type="tel" class="form-input director-phone" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Adres</label>
                        <textarea class="form-textarea director-address" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Özgeçmiş</label>
                        <textarea class="form-textarea director-biography" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Filmografi</label>
                        <textarea class="form-textarea director-filmography" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Öğrenci Belgesi <span class="required">(PDF, max 10 MB)</span></label>
                        <input type="file" class="form-input director-student-document" accept=".pdf" required>
                        <small class="file-info">PDF formatında, maksimum 10 MB boyutunda yükleyiniz.</small>
                    </div>
                </div>
            </div>
            <button type="button" class="add-btn" onclick="addDirectorStudent()">+ Yönetmen Ekle</button>
        </div>

        <!-- Optional Sections for Student Category -->
        <div class="optional-sections">
            <div class="optional-section">
                <div class="optional-header">
                    <h3>Yapımcı Bilgileri <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('producer')">+ Ekle</button>
                </div>
                <div id="producer-section" class="optional-content" style="display: none;">
                    <div id="producers-container"></div>
                    <button type="button" class="add-btn" onclick="addProducerStudent()">+ Yapımcı Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Metin Yazan Bilgileri <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('scriptwriter')">+ Ekle</button>
                </div>
                <div id="scriptwriter-section" class="optional-content" style="display: none;">
                    <div id="scriptwriters-container"></div>
                    <button type="button" class="add-btn" onclick="addScriptWriterStudent()">+ Metin Yazan Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Destekleyen Kurum/Kuruluş <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('sponsors')">+ Ekle</button>
                </div>
                <div id="sponsors-section" class="optional-content" style="display: none;">
                    <div id="sponsors-container"></div>
                    <button type="button" class="add-btn" onclick="addSponsorStudent()">+ Kurum/Kuruluş Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Satış Yetkilisi <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('salesagent')">+ Ekle</button>
                </div>
                <div id="salesagent-section" class="optional-content" style="display: none;">
                    <div id="salesagents-container"></div>
                    <button type="button" class="add-btn" onclick="addSalesAgentStudent()">+ Satış Yetkilisi Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Teknik Ekip <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('crew')">+ Ekle</button>
                </div>
                <div id="crew-section" class="optional-content" style="display: none;">
                    <div id="crew-container"></div>
                    <button type="button" class="add-btn" onclick="addCrewMemberStudent()">+ Teknik Ekip Üyesi Ekle</button>
                </div>
            </div>
        </div>
    `;
}

function getStep2Content() {
    return `
        <div class="form-section">
            <h3 class="section-title">Yönetmen Bilgileri <span class="required">(Zorunlu)</span></h3>
            <div id="directors-container">
                <div class="director-form" data-director="0">
                    <div class="director-header">
                        <h4>1. Yönetmen</h4>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Ad</label>
                            <input type="text" class="form-input director-name" required>
                        </div>
                        <div class="form-group">
                            <label>Soyad</label>
                            <input type="text" class="form-input director-surname" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>E-posta</label>
                            <input type="email" class="form-input director-email" required>
                        </div>
                        <div class="form-group">
                            <label>Telefon</label>
                            <input type="tel" class="form-input director-phone" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Adres</label>
                        <textarea class="form-textarea director-address" rows="3" required></textarea>
                    </div>
                </div>
            </div>
            <button type="button" class="add-btn" onclick="addDirector()">+ Yönetmen Ekle</button>
        </div>
    `;
}

function getStep3Content() {
    return `
        <div class="contract-section">
            <h3>Katılım Sözleşmesi</h3>
            <div class="contract-content">
                <h3>TRT Belgesel Ödülleri Katılım Sözleşmesi</h3>
                <p>Bu sözleşme, TRT Belgesel Ödülleri yarışmasına katılım koşullarını belirlemektedir.</p>
                <p>Yarışmaya katılım gönüllülük esasına dayanmaktadır ve aşağıdaki koşulları kabul ettiğinizi beyan edersiniz:</p>
                <p>1. Gönderilen eserlerin özgün olduğunu ve telif haklarının size ait olduğunu beyan edersiniz.</p>
                <p>2. Eserinizin yarışma kapsamında değerlendirilmesi ve gerekli görülmesi halinde yayınlanmasına izin verirsiniz.</p>
                <p>3. Yarışma sonuçlarına itiraz etmeyeceğinizi kabul edersiniz.</p>
                <p>4. Kişisel verilerinizin işlenmesine ilişkin aydınlatma metnini okuduğunuzu ve kabul ettiğinizi beyan edersiniz.</p>
            </div>
            <div class="contract-checkboxes">
                <div class="checkbox-group">
                    <input type="checkbox" id="contract-accept" required>
                    <label for="contract-accept">Katılım sözleşmesini okudum ve kabul ediyorum.</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="kvkk-accept" required>
                    <label for="kvkk-accept">KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum.</label>
                </div>
            </div>
        </div>
    `;
}

function getStep4Content() {
    return `
        <div class="summary-section">
            <h3>Başvuru Özeti</h3>
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Film Bilgileri</h4>
                    <button type="button" class="edit-btn" onclick="editStep(0)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    <p><strong>Kategori:</strong> ${formData.category}</p>
                    <p><strong>Film Adı (Özgün):</strong> ${formData.filmNameOriginal}</p>
                    <p><strong>Film Adı (Türkçe):</strong> ${formData.filmNameTurkish}</p>
                    <p><strong>Süre:</strong> ${formData.duration} dakika</p>
                    <p><strong>Yapım Tarihi:</strong> ${formData.productionDate}</p>
                </div>
            </div>
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Yönetmen Bilgileri</h4>
                    <button type="button" class="edit-btn" onclick="editStep(1)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    ${formData.directors.map((director, index) => `
                        <div class="director-summary">
                            <h5>${index + 1}. Yönetmen</h5>
                            <p><strong>Ad Soyad:</strong> ${director.name} ${director.surname}</p>
                            <p><strong>E-posta:</strong> ${director.email}</p>
                            <p><strong>Telefon:</strong> ${director.phone}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Sözleşme Onayları</h4>
                    <button type="button" class="edit-btn" onclick="editStep(2)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    <p><strong>Katılım Sözleşmesi:</strong> ${formData.contractAccepted ? 'Kabul Edildi' : 'Kabul Edilmedi'}</p>
                    <p><strong>KVKK Onayı:</strong> ${formData.kvkkAccepted ? 'Kabul Edildi' : 'Kabul Edilmedi'}</p>
                </div>
            </div>
        </div>
    `;
}

function initializeStep2() {
    // Initialize director forms if needed
    if (formData.directors.length === 0) {
        formData.directors.push({
            name: '',
            surname: '',
            email: '',
            phone: '',
            address: ''
        });
    }
}

function addDirector() {
    const directorsContainer = document.getElementById('directors-container');
    const directorIndex = formData.directors.length;
    
    formData.directors.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    });

    const directorForm = document.createElement('div');
    directorForm.className = 'director-form';
    directorForm.setAttribute('data-director', directorIndex);
    directorForm.innerHTML = `
        <div class="director-header">
            <h4>${directorIndex + 1}. Yönetmen</h4>
            <button type="button" class="remove-btn" onclick="removeDirector(${directorIndex})">Kaldır</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Ad</label>
                <input type="text" class="form-input director-name" required>
            </div>
            <div class="form-group">
                <label>Soyad</label>
                <input type="text" class="form-input director-surname" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>E-posta</label>
                <input type="email" class="form-input director-email" required>
            </div>
            <div class="form-group">
                <label>Telefon</label>
                <input type="tel" class="form-input director-phone" required>
            </div>
        </div>
        <div class="form-group">
            <label>Adres</label>
            <textarea class="form-textarea director-address" rows="3" required></textarea>
        </div>
    `;
    
    directorsContainer.appendChild(directorForm);
}

function removeDirector(index) {
    const directorForm = document.querySelector(`[data-director="${index}"]`);
    if (directorForm) {
        directorForm.remove();
        formData.directors.splice(index, 1);
        
        // Update director numbers
        const remainingForms = document.querySelectorAll('.director-form');
        remainingForms.forEach((form, newIndex) => {
            form.setAttribute('data-director', newIndex);
            const header = form.querySelector('.director-header h4');
            if (header) {
                header.textContent = `${newIndex + 1}. Yönetmen`;
            }
        });
    }
}

function editStep(stepIndex) {
    showStep(stepIndex);
}

function previousStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        
        if (currentStep < steps.length - 1) {
            showStep(currentStep + 1);
        } else {
            submitApplication();
        }
    }
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector('.form-step.active');
    if (!currentStepElement) return true;

    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    // Clear previous error states
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            showFieldError(field, 'Bu alan zorunludur.');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    // Step-specific validations
    switch(currentStep) {
        case 0:
            isValid = validateStep1() && isValid;
            break;
        case 1:
            isValid = validateStep2() && isValid;
            break;
        case 2:
            isValid = validateStep3() && isValid;
            break;
    }

    if (!isValid) {
        showValidationAlert();
    }

    return isValid;
}

function validateStep1() {
    let isValid = true;
    
    // Film summary character count validation
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary) {
        const length = filmSummary.value.length;
        if (length < 250 || length > 1000) {
            filmSummary.classList.add('error');
            showFieldError(filmSummary, 'Film özeti 250-1000 karakter arasında olmalıdır.');
            isValid = false;
        }
    }

    // URL validation
    const downloadLink = document.getElementById('download-link');
    if (downloadLink && downloadLink.value) {
        try {
            new URL(downloadLink.value);
        } catch {
            downloadLink.classList.add('error');
            showFieldError(downloadLink, 'Geçerli bir URL giriniz.');
            isValid = false;
        }
    }

    return isValid;
}

function validateStep2() {
    let isValid = true;
    
    // Validate all director forms
    const directorForms = document.querySelectorAll('.director-form');
    directorForms.forEach((form, index) => {
        const email = form.querySelector('.director-email');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('error');
                showFieldError(email, 'Geçerli bir e-posta adresi giriniz.');
                isValid = false;
            }
        }

        // Additional validation for student category - file upload
        if (selectedCategory === 'ogrenci-belgesel') {
            const studentDocument = form.querySelector('.director-student-document');
            if (studentDocument && studentDocument.files[0]) {
                const file = studentDocument.files[0];
                
                // Check file type
                if (file.type !== 'application/pdf') {
                    studentDocument.classList.add('error');
                    showFieldError(studentDocument, 'Sadece PDF dosyaları kabul edilir.');
                    isValid = false;
                }
                
                // Check file size (10 MB = 10 * 1024 * 1024 bytes)
                if (file.size > 10 * 1024 * 1024) {
                    studentDocument.classList.add('error');
                    showFieldError(studentDocument, 'Dosya boyutu 10 MB\'dan küçük olmalıdır.');
                    isValid = false;
                }
            } else if (studentDocument) {
                studentDocument.classList.add('error');
                showFieldError(studentDocument, 'Öğrenci belgesi yüklenmesi zorunludur.');
                isValid = false;
            }
        }
    });

    return isValid;
}

function validateStep3() {
    const contractAccept = document.getElementById('contract-accept');
    const kvkkAccept = document.getElementById('kvkk-accept');
    
    let isValid = true;

    if (!contractAccept || !contractAccept.checked) {
        if (contractAccept) {
            contractAccept.closest('.checkbox-group').classList.add('error');
        }
        isValid = false;
    }

    if (!kvkkAccept || !kvkkAccept.checked) {
        if (kvkkAccept) {
            kvkkAccept.closest('.checkbox-group').classList.add('error');
        }
        isValid = false;
    }

    return isValid;
}

function showFieldError(field, message) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function showValidationAlert() {
    // Remove existing alert
    const existingAlert = document.querySelector('.validation-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = 'validation-alert';
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">⚠️</span>
            <span class="alert-text">Lütfen tüm zorunlu alanları doldurunuz.</span>
        </div>
    `;

    const stepContent = document.getElementById('step-content');
    if (stepContent) {
        stepContent.insertBefore(alert, stepContent.firstChild);
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

function saveCurrentStepData() {
    switch(currentStep) {
        case 0:
            saveStep1Data();
            break;
        case 1:
            saveStep2Data();
            break;
        case 2:
            saveStep3Data();
            break;
    }
}

function saveStep1Data() {
    formData.filmNameOriginal = document.getElementById('film-name-original')?.value || '';
    formData.filmNameTurkish = document.getElementById('film-name-turkish')?.value || '';
    formData.originalLanguage = document.getElementById('original-language')?.value || '';
    formData.producerCountry = document.getElementById('producer-country')?.value || '';
    formData.duration = document.getElementById('duration')?.value || '';
    formData.soundInfo = document.getElementById('sound-info')?.value || '';
    formData.musicInfo = document.getElementById('music-info')?.value || '';
    formData.productionFormat = document.getElementById('production-format')?.value || '';
    formData.productionDate = document.getElementById('production-date')?.value || '';
    formData.filmSummary = document.getElementById('film-summary')?.value || '';
    formData.downloadLink = document.getElementById('download-link')?.value || '';
    formData.downloadPassword = document.getElementById('download-password')?.value || '';
    formData.festivals = document.getElementById('festivals')?.value || '';
    formData.awards = document.getElementById('awards')?.value || '';
    formData.socialMedia = document.getElementById('social-media')?.value || '';
    formData.imdbLink = document.getElementById('imdb-link')?.value || '';
}

function saveStep2Data() {
    const directorForms = document.querySelectorAll('.director-form');
    formData.directors = [];
    
    directorForms.forEach((form, index) => {
        const director = {
            name: form.querySelector('.director-name')?.value || '',
            surname: form.querySelector('.director-surname')?.value || '',
            email: form.querySelector('.director-email')?.value || '',
            phone: form.querySelector('.director-phone')?.value || '',
            address: form.querySelector('.director-address')?.value || ''
        };
        formData.directors.push(director);
    });
}

function saveStep3Data() {
    formData.contractAccepted = document.getElementById('contract-accept')?.checked || false;
    formData.kvkkAccepted = document.getElementById('kvkk-accept')?.checked || false;
}

function updateNavigationButtons() {
    if (!prevBtn || !nextBtn) return;

    // Previous button
    if (currentStep === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }

    // Next/Submit button
    if (currentStep === steps.length - 1) {
        nextBtn.textContent = 'Başvuruyu Gönder';
        nextBtn.className = 'nav-btn submit-btn';
    } else {
        nextBtn.textContent = 'İleri';
        nextBtn.className = 'nav-btn next-btn';
    }
}

function updateProgressSteps() {
    const progressSteps = document.querySelectorAll('.step');
    
    progressSteps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        
        if (index < currentStep) {
            step.classList.add('completed');
        } else if (index === currentStep) {
            step.classList.add('active');
        }
    });
}

function updateCharacterCount() {
    const filmSummary = document.getElementById('film-summary');
    const charCount = document.getElementById('char-count');
    
    if (filmSummary && charCount) {
        const length = filmSummary.value.length;
        charCount.textContent = length;
        
        if (length < 250 || length > 1000) {
            charCount.style.color = '#dc3545';
        } else {
            charCount.style.color = '#28a745';
        }
    }
}

function initializeFormValidation() {
    // Real-time validation for email fields
    document.addEventListener('input', function(event) {
        if (event.target.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (event.target.value && !emailRegex.test(event.target.value)) {
                event.target.classList.add('error');
            } else {
                event.target.classList.remove('error');
            }
        }
    });

    // Real-time validation for required fields
    document.addEventListener('blur', function(event) {
        if (event.target.hasAttribute('required')) {
            if (!event.target.value.trim()) {
                event.target.classList.add('error');
            } else {
                event.target.classList.remove('error');
            }
        }
    });
}

function submitApplication() {
    // Show success message
    if (stepContent) {
        stepContent.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>Başvurunuz Başarıyla Gönderildi!</h2>
                <p>Başvuru numaranız: <strong>TRT-${Date.now()}</strong></p>
                <div class="success-details">
                    <p>Başvuru Tarihi: ${new Date().toLocaleDateString('tr-TR')}</p>
                    <p>Kategori: ${formData.category}</p>
                    <p>Film: ${formData.filmNameTurkish}</p>
                </div>
                <p>Başvurunuz değerlendirmeye alınmıştır. Sonuçlar hakkında e-posta adresinize bilgilendirme yapılacaktır.</p>
                <button class="new-application-btn" onclick="location.reload()">Yeni Başvuru Yap</button>
            </div>
        `;
    }

    // Hide navigation buttons
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    // Update progress to show completion
    const progressSteps = document.querySelectorAll('.step');
    progressSteps.forEach(step => {
        step.classList.remove('active');
        step.classList.add('completed');
    });
}

// Optional section toggle functions
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId + '-section');
    const button = event.target;
    
    if (section) {
        if (section.style.display === 'none' || !section.style.display) {
            section.style.display = 'block';
            button.textContent = '- Kaldır';
            button.classList.remove('add-btn');
            button.classList.add('remove-btn');
        } else {
            section.style.display = 'none';
            button.textContent = '+ Ekle';
            button.classList.remove('remove-btn');
            button.classList.add('add-btn');
            
            // Clear the field when hiding
            const input = section.querySelector('input, textarea');
            if (input) {
                input.value = '';
            }
        }
    }
}

// Prevent form submission on Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
    }
});

// Handle browser back button
window.addEventListener('popstate', function(event) {
    if (currentStep > 0) {
        event.preventDefault();
        previousStep();
    }
});