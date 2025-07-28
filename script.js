// Global variables
let currentStep = 1;
let selectedCategory = '';
let formData = {};
let directorCount = 1;
let crewCount = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Add event listener for sales agent button
    const addSalesAgentBtn = document.getElementById('add-sales-agent-btn');
    if (addSalesAgentBtn) {
        addSalesAgentBtn.addEventListener('click', function() {
            const container = document.getElementById('sales-agents-container');
            if (container) {
                const salesAgentCount = container.children.length;
                const salesAgentHtml = `
                    <div class="person-form" id="sales-agent-${salesAgentCount + 1}">
                        <div class="person-header">
                            <h5>Satış Yetkilisi ${salesAgentCount + 1}</h5>
                            <button type="button" class="remove-btn" onclick="this.parentElement.parentElement.remove()">Kaldır</button>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Ad</label>
                                <input type="text" class="form-input" name="sales-agent-name-${salesAgentCount + 1}">
                            </div>
                            <div class="form-group">
                                <label>Soyad</label>
                                <input type="text" class="form-input" name="sales-agent-surname-${salesAgentCount + 1}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Telefon</label>
                                <input type="tel" class="form-input" name="sales-agent-phone-${salesAgentCount + 1}">
                            </div>
                            <div class="form-group">
                                <label>E-posta Adresi</label>
                                <input type="email" class="form-input" name="sales-agent-email-${salesAgentCount + 1}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Adres</label>
                            <textarea class="form-textarea" rows="3" name="sales-agent-address-${salesAgentCount + 1}"></textarea>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', salesAgentHtml);
            }
        });
    }
});

function initializeApp() {
    // Add event listeners
    document.getElementById('start-application-btn').addEventListener('click', startApplication);
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('prev-btn').addEventListener('click', prevStep);
    
    // Add category selection listeners
    const categoryOptions = document.querySelectorAll('.category-option');
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            selectCategory(radio.value);
        });
    });

    // Add form input listeners for real-time validation
    addFormInputListeners();
    
    // Character count for film summary
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary) {
        filmSummary.addEventListener('input', updateCharacterCount);
    }
}

function selectCategory(category) {
    selectedCategory = category;
    
    // Remove active class from all options
    document.querySelectorAll('.category-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    // Add active class to selected option
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Update category display
    updateCategoryDisplay();
    
    // Update form language if needed
    if (category === 'international-competition') {
        updateFormLanguage('en');
    } else {
        updateFormLanguage('tr');
    }
}

function updateCategoryDisplay() {
    const categoryDisplay = document.getElementById('category-display');
    const categoryNames = {
        'profesyonel-belgesel': 'Profesyonel | Ulusal Belgesel Ödülleri Yarışması',
        'ogrenci-belgesel': 'Öğrenci | Ulusal Belgesel Ödülleri Yarışması',
        'international-competition': 'International Competition',
        'proje-destek': 'Proje Destek Yarışması'
    };
    
    if (categoryDisplay && selectedCategory) {
        categoryDisplay.textContent = categoryNames[selectedCategory] || selectedCategory;
    }
}

function updateFormLanguage(lang) {
    // This function can be expanded to change form labels based on language
    // For now, we'll keep it simple
    if (lang === 'en') {
        // Update some key labels for international competition
        const stepTitle = document.getElementById('step-title');
        if (stepTitle && currentStep === 1) {
            stepTitle.textContent = 'Film Link and Information';
        }
    }
}

function startApplication() {
    if (!selectedCategory) {
        alert('Lütfen bir kategori seçiniz.');
        return;
    }
    
    // Hide category selection and show form steps
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('form-steps').style.display = 'block';
    
    // Update progress steps
    updateProgressSteps();
    
    // Update step content
    updateStepContent();
}

function nextStep() {
    if (validateStep(currentStep)) {
        saveStepData(currentStep);
        
        if (currentStep < 4) {
            currentStep++;
            updateProgressSteps();
            updateStepContent();
        } else {
            submitApplication();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgressSteps();
        updateStepContent();
    }
}

function backToCategorySelection() {
    document.getElementById('category-selection').style.display = 'block';
    document.getElementById('form-steps').style.display = 'none';
    currentStep = 1;
    updateProgressSteps();
}

function updateProgressSteps() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
}

function updateStepContent() {
    const stepTitle = document.getElementById('step-title');
    const stepContent = document.getElementById('step-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const backToCategoryBtn = document.getElementById('back-to-category-btn');
    
    // Show/hide navigation buttons
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    backToCategoryBtn.style.display = currentStep === 1 ? 'block' : 'none';
    
    switch (currentStep) {
        case 1:
            stepTitle.textContent = selectedCategory === 'international-competition' ? 'Film Link and Information' : 'Eser Linki ve Bilgileri';
            stepContent.innerHTML = getStep1Content();
            nextBtn.textContent = 'İleri';
            break;
        case 2:
            stepTitle.textContent = selectedCategory === 'international-competition' ? 'Film Owner Information' : 'Eser Sahibi Bilgileri';
            stepContent.innerHTML = getStep2Content();
            nextBtn.textContent = 'İleri';
            break;
        case 3:
            stepTitle.textContent = selectedCategory === 'international-competition' ? 'Participation Agreement' : 'Katılım Sözleşmesi';
            stepContent.innerHTML = getStep3Content();
            nextBtn.textContent = 'İleri';
            break;
        case 4:
            stepTitle.textContent = selectedCategory === 'international-competition' ? 'Application Summary and Confirmation' : 'Başvuru Özeti ve Onay';
            stepContent.innerHTML = getStep4Content();
            nextBtn.textContent = 'Başvuruyu Tamamla';
            nextBtn.classList.add('submit-btn');
            break;
    }
    
    // Re-add event listeners after content update
    addFormInputListeners();
    
    // Update character count if on step 1
    if (currentStep === 1) {
        const filmSummary = document.getElementById('film-summary');
        if (filmSummary) {
            filmSummary.addEventListener('input', updateCharacterCount);
            updateCharacterCount(); // Update initial count
        }
    }
    
    // Load saved data
    loadStepData(currentStep);
}

function getStep1Content() {
    return `
        <!-- Film Bilgileri Section -->
        <div class="form-section">
            <h3 class="section-title">Film Bilgileri <span class="required">(Zorunlu)</span></h3>
            
            <!-- Kategori -->
            <div class="form-group">
                <label for="category-display">Kategori</label>
                <div id="category-display" class="category-display-field">
                    ${getCategoryDisplayName()}
                </div>
            </div>

            <!-- Film Adları -->
            <div class="form-row">
                <div class="form-group">
                    <label for="film-name-original">${selectedCategory === 'international-competition' ? 'Original Film Name' : 'Filmin Özgün Adı'}</label>
                    <input type="text" id="film-name-original" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="film-name-turkish">${selectedCategory === 'international-competition' ? 'Turkish Film Name' : 'Filmin Türkçe Adı'}</label>
                    <input type="text" id="film-name-turkish" class="form-input" required>
                </div>
            </div>

            <!-- Özgün Dil, Yapımcı Ülke, Süre -->
            <div class="form-row form-row-three">
                <div class="form-group">
                    <label for="original-language">${selectedCategory === 'international-competition' ? 'Original Language' : 'Özgün Dili'}</label>
                    <select id="original-language" class="form-select" required>
                        <option value="">${selectedCategory === 'international-competition' ? 'Select' : 'Seçiniz'}</option>
                        <option value="turkish">Türkçe</option>
                        <option value="english">English</option>
                        <option value="french">Français</option>
                        <option value="german">Deutsch</option>
                        <option value="other">${selectedCategory === 'international-competition' ? 'Other' : 'Diğer'}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="producer-country">${selectedCategory === 'international-competition' ? 'Producer Country' : 'Yapımcı Ülke'}</label>
                    <select id="producer-country" class="form-select" required>
                        <option value="">${selectedCategory === 'international-competition' ? 'Select' : 'Seçiniz'}</option>
                        <option value="turkey">Turkey</option>
                        <option value="usa">USA</option>
                        <option value="uk">United Kingdom</option>
                        <option value="france">France</option>
                        <option value="germany">Germany</option>
                        <option value="other">${selectedCategory === 'international-competition' ? 'Other' : 'Diğer'}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="duration">${selectedCategory === 'international-competition' ? 'Duration' : 'Süresi'}</label>
                    <div class="duration-input">
                        <input type="number" id="duration" class="form-input duration-field" placeholder="00" min="1" max="999" required>
                        <span class="duration-label">${selectedCategory === 'international-competition' ? 'Minutes' : 'Dakika'}</span>
                    </div>
                </div>
            </div>

            <!-- Ses Bilgisi, Müzik Bilgisi -->
            <div class="form-row">
                <div class="form-group">
                    <label for="sound-info">${selectedCategory === 'international-competition' ? 'Sound Information' : 'Ses Bilgisi'}</label>
                    <input type="text" id="sound-info" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="music-info">${selectedCategory === 'international-competition' ? 'Music/Original Music Information' : 'Müzik/Özgün Müzik Bilgisi'}</label>
                    <input type="text" id="music-info" class="form-input" required>
                </div>
            </div>

            <!-- Yapım Formatı, Yapım Tarihi -->
            <div class="form-row">
                <div class="form-group">
                    <label for="production-format">${selectedCategory === 'international-competition' ? 'Production Format Aspect Ratio' : 'Yapım Formatı Ekran Oranı'}</label>
                    <select id="production-format" class="form-select" required>
                        <option value="">${selectedCategory === 'international-competition' ? 'Select' : 'Seçiniz'}</option>
                        <option value="16:9">16:9</option>
                        <option value="4:3">4:3</option>
                        <option value="21:9">21:9</option>
                        <option value="other">${selectedCategory === 'international-competition' ? 'Other' : 'Diğer'}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="production-date">${selectedCategory === 'international-competition' ? 'Production Date (Month/Year)' : 'Yapım Tarihi (Ay/Yıl)'}</label>
                    <input type="month" id="production-date" class="form-input" required>
                </div>
            </div>

            <!-- Film Kısa Özeti -->
            <div class="form-group">
                <label for="film-summary">${selectedCategory === 'international-competition' ? 'Brief Film Summary (250-1000 Characters)' : 'Filmin Kısa Özeti (250-1000 Karakter)'}</label>
                <textarea id="film-summary" class="form-textarea" rows="6" minlength="250" maxlength="1000" required placeholder="${selectedCategory === 'international-competition' ? 'Write your film summary here...' : 'Filminizin kısa özetini buraya yazınız...'}"></textarea>
                <div class="character-count">
                    <span id="char-count">0</span>/1000 ${selectedCategory === 'international-competition' ? 'characters' : 'karakter'}
                </div>
            </div>

            <!-- İndirilebilir Film Linki -->
            <div class="form-row">
                <div class="form-group">
                    <label for="download-link">${selectedCategory === 'international-competition' ? 'Downloadable Film Link' : 'İndirilebilir Film Linki'}</label>
                    <input type="url" id="download-link" class="form-input" required>
                    <small class="form-help">${selectedCategory === 'international-competition' ? 'You need to upload your film to Google Drive.' : 'Filminizi Google Drive\'a yüklemeniz gerekmektedir.'}</small>
                </div>
                <div class="form-group">
                    <label for="download-password">${selectedCategory === 'international-competition' ? 'Download Link Password' : 'İndirilebilir Link Şifresi'}</label>
                    <input type="text" id="download-password" class="form-input">
                    <small class="form-help">${selectedCategory === 'international-competition' ? 'Leave this field empty if no password is required for download.' : 'İndirme için şifre gerekli değilse bu alanı boş bırakınız.'}</small>
                </div>
            </div>

            <!-- Format Bilgisi -->
            <div class="format-info">
                <ul>
                    <li>${selectedCategory === 'international-competition' ? 'Accepted formats: mpeg2, mov, mxf, mp4' : 'Kabul edilen formatlar: mpeg2, mov, mxf, mp4'}</li>
                    <li>${selectedCategory === 'international-competition' ? 'Make sure the links you provide are downloadable. (YouTube links will not be accepted.)' : 'Verdiğiniz bağlantıların indirilebilir olduğundan emin olunuz. (Youtube bağlantıları kabul edilmeyecektir.)'}</li>
                </ul>
            </div>
        </div>

        <!-- Optional Sections -->
        <div class="optional-sections">
            <div class="optional-section">
                <div class="optional-header">
                    <h3>${selectedCategory === 'international-competition' ? 'Participated Festivals' : 'Katıldığı Festivaller'} <span class="optional">${selectedCategory === 'international-competition' ? '(Optional)' : '(Opsiyonel)'}</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('festivals')">${selectedCategory === 'international-competition' ? '+ Add' : '+ Ekle'}</button>
                </div>
                <div id="festivals-section" class="optional-content" style="display: none;">
                    <div class="form-group">
                        <textarea id="festivals" class="form-textarea" rows="3" placeholder="${selectedCategory === 'international-competition' ? 'Write participated festivals here...' : 'Katıldığı festivalleri buraya yazınız...'}"></textarea>
                    </div>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>${selectedCategory === 'international-competition' ? 'Awards Received' : 'Aldığı Ödüller'} <span class="optional">${selectedCategory === 'international-competition' ? '(Optional)' : '(Opsiyonel)'}</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('awards')">${selectedCategory === 'international-competition' ? '+ Add' : '+ Ekle'}</button>
                </div>
                <div id="awards-section" class="optional-content" style="display: none;">
                    <div class="form-group">
                        <textarea id="awards" class="form-textarea" rows="3" placeholder="${selectedCategory === 'international-competition' ? 'Write awards received here...' : 'Aldığı ödülleri buraya yazınız...'}"></textarea>
                    </div>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>${selectedCategory === 'international-competition' ? 'Social Media Accounts' : 'Sosyal Medya Hesapları'} <span class="optional">${selectedCategory === 'international-competition' ? '(Optional)' : '(Opsiyonel)'}</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('social')">${selectedCategory === 'international-competition' ? '+ Add' : '+ Ekle'}</button>
                </div>
                <div id="social-section" class="optional-content" style="display: none;">
                    <div class="form-group">
                        <textarea id="social-media" class="form-textarea" rows="3" placeholder="${selectedCategory === 'international-competition' ? 'Write your social media accounts here...' : 'Sosyal medya hesaplarınızı buraya yazınız...'}"></textarea>
                    </div>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>IMDB ${selectedCategory === 'international-competition' ? 'Link' : 'Linki'} <span class="optional">${selectedCategory === 'international-competition' ? '(Optional)' : '(Opsiyonel)'}</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('imdb')">${selectedCategory === 'international-competition' ? '+ Add' : '+ Ekle'}</button>
                </div>
                <div id="imdb-section" class="optional-content" style="display: none;">
                    <div class="form-group">
                        <input type="url" id="imdb-link" class="form-input" placeholder="${selectedCategory === 'international-competition' ? 'Write your IMDB link here...' : 'IMDB linkinizi buraya yazınız...'}">
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStep2Content() {
    const isInternational = selectedCategory === 'international-competition';
    const isStudent = selectedCategory === 'ogrenci-belgesel';
    
    return `
        <div class="form-section">
            <div class="section-header">
                <h3 class="section-title">${isInternational ? 'Director Information' : 'Yönetmen Bilgileri'} <span class="required">${isInternational ? '(Required)' : '(Zorunlu)'}</span></h3>
                <button type="button" class="add-btn" onclick="addDirector()">${isInternational ? '+ Add Director' : '+ Yönetmen Ekle'}</button>
            </div>
            
            <div id="directors-container">
                <div class="person-form" data-director="1">
                    <div class="person-header">
                        <h5>${isInternational ? 'Director 1' : 'Yönetmen 1'}</h5>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="director-1-name">${isInternational ? 'Name Surname' : 'Ad Soyad'}</label>
                            <input type="text" id="director-1-name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="director-1-email">E-posta</label>
                            <input type="email" id="director-1-email" class="form-input" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="director-1-phone">${isInternational ? 'Phone' : 'Telefon'}</label>
                            <input type="tel" id="director-1-phone" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="director-1-address">${isInternational ? 'Address' : 'Adres'}</label>
                            <input type="text" id="director-1-address" class="form-input" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="director-1-bio">${isInternational ? 'Biography' : 'Biyografi'}</label>
                            <textarea id="director-1-bio" class="form-textarea" rows="3" placeholder="${isInternational ? 'Not specified' : 'Belirtilmemiş'}"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="director-1-filmography">${isInternational ? 'Filmography' : 'Filmografi'}</label>
                            <textarea id="director-1-filmography" class="form-textarea" rows="3" placeholder="${isInternational ? 'Not specified' : 'Belirtilmemiş'}"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-section">
            <div class="section-header">
                <h3 class="section-title">${isInternational ? 'Producer Information' : 'Yapımcı Bilgileri'} <span class="optional">${isInternational ? '(Optional)' : '(Opsiyonel)'}</span></h3>
                <button type="button" class="add-btn" onclick="addCrew('producer')">${isInternational ? '+ Add Producer' : '+ Yapımcı Ekle'}</button>
            </div>
            <div id="producers-container"></div>
        </div>

        <div class="form-section">
            <div class="section-header">
                <h3 class="section-title">${isInternational ? 'Technical Crew' : 'Teknik Ekip'} <span class="optional">${isInternational ? '(Optional)' : '(Opsiyonel)'}</span></h3>
                <button type="button" class="add-btn" onclick="addCrew('technical')">${isInternational ? '+ Add Crew Member' : '+ Ekip Üyesi Ekle'}</button>
            </div>
            <div id="technical-crew-container"></div>
        </div>

        ${isStudent ? `
        <div class="form-section student-document-section">
            <h3 class="section-title">${isInternational ? 'Student Document' : 'Öğrenci Belgesi'} <span class="required">${isInternational ? '(Required)' : '(Zorunlu)'}</span></h3>
            <div class="file-upload-area" onclick="document.getElementById('student-document').click()">
                <div class="upload-icon">📄</div>
                <div class="upload-text">${isInternational ? 'Click to upload student document' : 'Öğrenci belgenizi yüklemek için tıklayın'}</div>
                <div class="upload-info">${isInternational ? 'PDF format, max 10MB' : 'PDF formatı, maksimum 10MB'}</div>
                <input type="file" id="student-document" accept=".pdf" style="display: none;" onchange="handleFileUpload(this)">
            </div>
            <div id="file-upload-result"></div>
        </div>
        ` : ''}
    `;
}

function getStep3Content() {
    const isInternational = selectedCategory === 'international-competition';
    
    return `
        <div class="contract-section">
            <div class="contract-content">
                <h3>${isInternational ? 'Participation Agreement' : 'Katılım Sözleşmesi'}</h3>
                <p>${isInternational ? 'By participating in this competition, you agree to the following terms and conditions:' : 'Bu yarışmaya katılarak aşağıdaki şartları kabul etmiş olursunuz:'}</p>
                <p>${isInternational ? '1. The submitted work is original and does not infringe any copyright.' : '1. Gönderilen eser özgün olup, herhangi bir telif hakkını ihlal etmemektedir.'}</p>
                <p>${isInternational ? '2. TRT has the right to broadcast the submitted work.' : '2. TRT, gönderilen eseri yayınlama hakkına sahiptir.'}</p>
                <p>${isInternational ? '3. The participant is responsible for all legal issues related to the work.' : '3. Katılımcı, eserle ilgili tüm yasal sorumlulukları üstlenir.'}</p>
                <p>${isInternational ? '4. TRT reserves the right to disqualify any work that does not comply with the rules.' : '4. TRT, kurallara uymayan eserleri yarışma dışı bırakma hakkını saklı tutar.'}</p>
                <p>${isInternational ? 'For detailed terms and conditions, please visit: ' : 'Detaylı şartlar ve koşullar için lütfen ziyaret edin: '}<a href="https://www.trt.net.tr" target="_blank">https://www.trt.net.tr</a></p>
            </div>
            
            <div class="contract-checkboxes">
                <div class="checkbox-group">
                    <input type="checkbox" id="contract-accept" required>
                    <label for="contract-accept">${isInternational ? 'I have read and accept the participation agreement.' : 'Katılım sözleşmesini okudum ve kabul ediyorum.'}</label>
                </div>
                
                <div class="checkbox-group">
                    <input type="checkbox" id="kvkk-accept" required>
                    <label for="kvkk-accept">${isInternational ? 'I accept the processing of my personal data in accordance with KVKK (Personal Data Protection Law).' : 'Kişisel verilerimin KVKK kapsamında işlenmesini kabul ediyorum.'}</label>
                </div>
            </div>
        </div>
    `;
}

function getStep4Content() {
    const isInternational = selectedCategory === 'international-competition';
    
    return `
        <div class="summary-section">
            <h3>${isInternational ? 'Application Summary' : 'Başvuru Özeti'}</h3>
            
            <!-- Film Bilgileri Özeti -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>${isInternational ? 'Film Information' : 'Film Bilgileri'}</h4>
                    <button type="button" class="edit-btn" onclick="editStep(1)">✏️ ${isInternational ? 'Edit' : 'Düzenle'}</button>
                </div>
                <div class="summary-content" id="film-summary-content">
                    <!-- Film bilgileri buraya yüklenecek -->
                </div>
            </div>
            
            <!-- Başvuru Sahibi Bilgileri Özeti -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>${isInternational ? 'Applicant Information' : 'Başvuru Sahibi Bilgileri'}</h4>
                    <button type="button" class="edit-btn" onclick="editStep(2)">✏️ ${isInternational ? 'Edit' : 'Düzenle'}</button>
                </div>
                <div class="summary-content" id="applicant-summary-content">
                    <!-- Başvuru sahibi bilgileri buraya yüklenecek -->
                </div>
            </div>
            
            <!-- Sözleşme Onayları Özeti -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>${isInternational ? 'Agreement Confirmations' : 'Sözleşme Onayları'}</h4>
                    <button type="button" class="edit-btn" onclick="editStep(3)">✏️ ${isInternational ? 'Edit' : 'Düzenle'}</button>
                </div>
                <div class="summary-content" id="contract-summary-content">
                    <!-- Sözleşme onayları buraya yüklenecek -->
                </div>
            </div>
        </div>
    `;
}

function getCategoryDisplayName() {
    const categoryNames = {
        'profesyonel-belgesel': 'Profesyonel | Ulusal Belgesel Ödülleri Yarışması',
        'ogrenci-belgesel': 'Öğrenci | Ulusal Belgesel Ödülleri Yarışması',
        'international-competition': 'International Competition',
        'proje-destek': 'Proje Destek Yarışması'
    };
    
    return categoryNames[selectedCategory] || selectedCategory;
}

function addDirector() {
    directorCount++;
    const isInternational = selectedCategory === 'international-competition';
    const container = document.getElementById('directors-container');
    
    const directorForm = document.createElement('div');
    directorForm.className = 'person-form';
    directorForm.setAttribute('data-director', directorCount);
    
    directorForm.innerHTML = `
        <div class="person-header">
            <h5>${isInternational ? 'Director' : 'Yönetmen'} ${directorCount}</h5>
            <button type="button" class="remove-btn" onclick="removeDirector(${directorCount})">${isInternational ? 'Remove' : 'Kaldır'}</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="director-${directorCount}-name">${isInternational ? 'Name Surname' : 'Ad Soyad'}</label>
                <input type="text" id="director-${directorCount}-name" class="form-input" required>
            </div>
            <div class="form-group">
                <label for="director-${directorCount}-email">E-posta</label>
                <input type="email" id="director-${directorCount}-email" class="form-input" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="director-${directorCount}-phone">${isInternational ? 'Phone' : 'Telefon'}</label>
                <input type="tel" id="director-${directorCount}-phone" class="form-input" required>
            </div>
            <div class="form-group">
                <label for="director-${directorCount}-address">${isInternational ? 'Address' : 'Adres'}</label>
                <input type="text" id="director-${directorCount}-address" class="form-input" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="director-${directorCount}-bio">${isInternational ? 'Biography' : 'Biyografi'}</label>
                <textarea id="director-${directorCount}-bio" class="form-textarea" rows="3" placeholder="${isInternational ? 'Not specified' : 'Belirtilmemiş'}"></textarea>
            </div>
            <div class="form-group">
                <label for="director-${directorCount}-filmography">${isInternational ? 'Filmography' : 'Filmografi'}</label>
                <textarea id="director-${directorCount}-filmography" class="form-textarea" rows="3" placeholder="${isInternational ? 'Not specified' : 'Belirtilmemiş'}"></textarea>
            </div>
        </div>
    `;
    
    container.appendChild(directorForm);
}

function removeDirector(directorId) {
    const directorForm = document.querySelector(`[data-director="${directorId}"]`);
    if (directorForm && directorCount > 1) {
        directorForm.remove();
    }
}

function addCrew(type) {
    crewCount++;
    const isInternational = selectedCategory === 'international-competition';
    const container = document.getElementById(type === 'producer' ? 'producers-container' : 'technical-crew-container');
    
    const crewForm = document.createElement('div');
    crewForm.className = 'crew-form';
    crewForm.setAttribute('data-crew', crewCount);
    crewForm.setAttribute('data-crew-type', type);
    
    const title = type === 'producer' ? 
        (isInternational ? 'Producer' : 'Yapımcı') : 
        (isInternational ? 'Crew Member' : 'Ekip Üyesi');
    
    crewForm.innerHTML = `
        <div class="crew-header">
            <h5>${title} ${crewCount}</h5>
            <button type="button" class="remove-btn" onclick="removeCrew(${crewCount})">${isInternational ? 'Remove' : 'Kaldır'}</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="${type}-${crewCount}-name">${isInternational ? 'Name Surname' : 'Ad Soyad'}</label>
                <input type="text" id="${type}-${crewCount}-name" class="form-input" required>
            </div>
            <div class="form-group">
                <label for="${type}-${crewCount}-role">${isInternational ? 'Role' : 'Görev'}</label>
                <input type="text" id="${type}-${crewCount}-role" class="form-input" required>
            </div>
        </div>
    `;
    
    container.appendChild(crewForm);
}

function removeCrew(crewId) {
    const crewForm = document.querySelector(`[data-crew="${crewId}"]`);
    if (crewForm) {
        crewForm.remove();
    }
}

function toggleSection(sectionName) {
    const section = document.getElementById(`${sectionName}-section`);
    const button = section.previousElementSibling.querySelector('.add-btn');
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
        button.textContent = selectedCategory === 'international-competition' ? '- Remove' : '- Kaldır';
    } else {
        section.style.display = 'none';
        button.textContent = selectedCategory === 'international-competition' ? '+ Add' : '+ Ekle';
    }
}

function updateCharacterCount() {
    const textarea = document.getElementById('film-summary');
    const counter = document.getElementById('char-count');
    
    if (textarea && counter) {
        counter.textContent = textarea.value.length;
    }
}

function handleFileUpload(input) {
    const file = input.files[0];
    const resultDiv = document.getElementById('file-upload-result');
    
    if (file) {
        // Validate file type
        if (file.type !== 'application/pdf') {
            resultDiv.innerHTML = '<div class="file-error">Sadece PDF dosyaları kabul edilir.</div>';
            input.value = '';
            return;
        }
        
        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            resultDiv.innerHTML = '<div class="file-error">Dosya boyutu 10MB\'dan büyük olamaz.</div>';
            input.value = '';
            return;
        }
        
        resultDiv.innerHTML = `<div class="file-success">✅ ${file.name} başarıyla yüklendi.</div>`;
    }
}

function validateStep(step) {
    clearValidationErrors();
    let isValid = true;
    
    switch (step) {
        case 1:
            isValid = validateStep1();
            break;
        case 2:
            isValid = validateStep2();
            break;
        case 3:
            isValid = validateStep3();
            break;
        case 4:
            isValid = true; // Summary step doesn't need validation
            break;
    }
    
    if (!isValid) {
        showValidationAlert();
    }
    
    return isValid;
}

function validateStep1() {
    let isValid = true;
    const requiredFields = [
        'film-name-original',
        'film-name-turkish',
        'original-language',
        'producer-country',
        'duration',
        'sound-info',
        'music-info',
        'production-format',
        'production-date',
        'film-summary',
        'download-link'
    ];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            markFieldAsError(field);
            isValid = false;
        }
    });
    
    // Validate film summary length
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary && filmSummary.value.length < 250) {
        markFieldAsError(filmSummary, 'Özet en az 250 karakter olmalıdır.');
        isValid = false;
    }
    
    return isValid;
}

function validateStep2() {
    let isValid = true;
    
    // Validate at least one director
    const directorName = document.getElementById('director-1-name');
    const directorEmail = document.getElementById('director-1-email');
    const directorPhone = document.getElementById('director-1-phone');
    const directorAddress = document.getElementById('director-1-address');
    
    if (!directorName || !directorName.value.trim()) {
        markFieldAsError(directorName);
        isValid = false;
    }
    
    if (!directorEmail || !directorEmail.value.trim()) {
        markFieldAsError(directorEmail);
        isValid = false;
    }
    
    if (!directorPhone || !directorPhone.value.trim()) {
        markFieldAsError(directorPhone);
        isValid = false;
    }
    
    if (!directorAddress || !directorAddress.value.trim()) {
        markFieldAsError(directorAddress);
        isValid = false;
    }
    
    // Validate student document if student category
    if (selectedCategory === 'ogrenci-belgesel') {
        const studentDoc = document.getElementById('student-document');
        if (!studentDoc || !studentDoc.files.length) {
            const uploadArea = document.querySelector('.file-upload-area');
            if (uploadArea) {
                uploadArea.style.borderColor = '#dc3545';
                uploadArea.style.backgroundColor = '#fff5f5';
            }
            isValid = false;
        }
    }
    
    return isValid;
}

function validateStep3() {
    let isValid = true;
    
    const contractAccept = document.getElementById('contract-accept');
    const kvkkAccept = document.getElementById('kvkk-accept');
    
    if (!contractAccept || !contractAccept.checked) {
        markCheckboxAsError(contractAccept);
        isValid = false;
    }
    
    if (!kvkkAccept || !kvkkAccept.checked) {
        markCheckboxAsError(kvkkAccept);
        isValid = false;
    }
    
    return isValid;
}

function markFieldAsError(field, message = '') {
    if (field) {
        field.classList.add('error');
        
        if (message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }
}

function markCheckboxAsError(checkbox) {
    if (checkbox) {
        const checkboxGroup = checkbox.closest('.checkbox-group');
        if (checkboxGroup) {
            checkboxGroup.classList.add('error');
        }
    }
}

function clearValidationErrors() {
    // Remove error classes
    document.querySelectorAll('.error').forEach(element => {
        element.classList.remove('error');
    });
    
    // Remove error messages
    document.querySelectorAll('.error-message').forEach(element => {
        element.remove();
    });
    
    // Remove validation alert
    const existingAlert = document.querySelector('.validation-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Reset file upload area
    const uploadArea = document.querySelector('.file-upload-area');
    if (uploadArea) {
        uploadArea.style.borderColor = '';
        uploadArea.style.backgroundColor = '';
    }
}

function showValidationAlert() {
    const stepContent = document.getElementById('step-content');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'validation-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">⚠️</span>
            <span class="alert-text">Lütfen tüm zorunlu alanları doldurunuz.</span>
        </div>
    `;
    
    stepContent.insertBefore(alertDiv, stepContent.firstChild);
    
    // Scroll to top to show alert
    stepContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveStepData(step) {
    switch (step) {
        case 1:
            saveStep1Data();
            break;
        case 2:
            saveStep2Data();
            break;
        case 3:
            saveStep3Data();
            break;
    }
}

function saveStep1Data() {
    formData.step1 = {
        category: selectedCategory,
        filmNameOriginal: getFieldValue('film-name-original'),
        filmNameTurkish: getFieldValue('film-name-turkish'),
        originalLanguage: getFieldValue('original-language'),
        producerCountry: getFieldValue('producer-country'),
        duration: getFieldValue('duration'),
        soundInfo: getFieldValue('sound-info'),
        musicInfo: getFieldValue('music-info'),
        productionFormat: getFieldValue('production-format'),
        productionDate: getFieldValue('production-date'),
        filmSummary: getFieldValue('film-summary'),
        downloadLink: getFieldValue('download-link'),
        downloadPassword: getFieldValue('download-password'),
        festivals: getFieldValue('festivals'),
        awards: getFieldValue('awards'),
        socialMedia: getFieldValue('social-media'),
        imdbLink: getFieldValue('imdb-link')
    };
}

function saveStep2Data() {
    // Save directors
    formData.directors = [];
    const directorForms = document.querySelectorAll('[data-director]');
    
    directorForms.forEach(form => {
        const directorId = form.getAttribute('data-director');
        const director = {
            id: directorId,
            name: getFieldValue(`director-${directorId}-name`),
            email: getFieldValue(`director-${directorId}-email`),
            phone: getFieldValue(`director-${directorId}-phone`),
            address: getFieldValue(`director-${directorId}-address`),
            bio: getFieldValue(`director-${directorId}-bio`) || 'Belirtilmemiş',
            filmography: getFieldValue(`director-${directorId}-filmography`) || 'Belirtilmemiş'
        };
        formData.directors.push(director);
    });
    
    // Save producers
    formData.producers = [];
    const producerForms = document.querySelectorAll('[data-crew-type="producer"]');
    
    producerForms.forEach(form => {
        const crewId = form.getAttribute('data-crew');
        const producer = {
            id: crewId,
            name: getFieldValue(`producer-${crewId}-name`),
            role: getFieldValue(`producer-${crewId}-role`)
        };
        formData.producers.push(producer);
    });
    
    // Save technical crew
    formData.technicalCrew = [];
    const technicalForms = document.querySelectorAll('[data-crew-type="technical"]');
    
    technicalForms.forEach(form => {
        const crewId = form.getAttribute('data-crew');
        const crew = {
            id: crewId,
            name: getFieldValue(`technical-${crewId}-name`),
            role: getFieldValue(`technical-${crewId}-role`)
        };
        formData.technicalCrew.push(crew);
    });
    
    // Save student document if applicable
    if (selectedCategory === 'ogrenci-belgesel') {
        const studentDoc = document.getElementById('student-document');
        formData.studentDocument = studentDoc && studentDoc.files.length ? studentDoc.files[0].name : null;
    }
}

function saveStep3Data() {
    formData.step3 = {
        contractAccepted: document.getElementById('contract-accept')?.checked || false,
        kvkkAccepted: document.getElementById('kvkk-accept')?.checked || false
    };
}

function loadStepData(step) {
    switch (step) {
        case 1:
            loadStep1Data();
            break;
        case 2:
            loadStep2Data();
            break;
        case 3:
            loadStep3Data();
            break;
        case 4:
            loadStep4Data();
            break;
    }
}

function loadStep1Data() {
    if (formData.step1) {
        const data = formData.step1;
        setFieldValue('film-name-original', data.filmNameOriginal);
        setFieldValue('film-name-turkish', data.filmNameTurkish);
        setFieldValue('original-language', data.originalLanguage);
        setFieldValue('producer-country', data.producerCountry);
        setFieldValue('duration', data.duration);
        setFieldValue('sound-info', data.soundInfo);
        setFieldValue('music-info', data.musicInfo);
        setFieldValue('production-format', data.productionFormat);
        setFieldValue('production-date', data.productionDate);
        setFieldValue('film-summary', data.filmSummary);
        setFieldValue('download-link', data.downloadLink);
        setFieldValue('download-password', data.downloadPassword);
        setFieldValue('festivals', data.festivals);
        setFieldValue('awards', data.awards);
        setFieldValue('social-media', data.socialMedia);
        setFieldValue('imdb-link', data.imdbLink);
        
        updateCharacterCount();
    }
}

function loadStep2Data() {
    // Load directors
    if (formData.directors && formData.directors.length > 0) {
        formData.directors.forEach((director, index) => {
            if (index > 0) {
                addDirector();
            }
            
            setFieldValue(`director-${director.id}-name`, director.name);
            setFieldValue(`director-${director.id}-email`, director.email);
            setFieldValue(`director-${director.id}-phone`, director.phone);
            setFieldValue(`director-${director.id}-address`, director.address);
            setFieldValue(`director-${director.id}-bio`, director.bio);
            setFieldValue(`director-${director.id}-filmography`, director.filmography);
        });
    }
    
    // Load producers
    if (formData.producers && formData.producers.length > 0) {
        formData.producers.forEach(producer => {
            addCrew('producer');
            setFieldValue(`producer-${producer.id}-name`, producer.name);
            setFieldValue(`producer-${producer.id}-role`, producer.role);
        });
    }
    
    // Load technical crew
    if (formData.technicalCrew && formData.technicalCrew.length > 0) {
        formData.technicalCrew.forEach(crew => {
            addCrew('technical');
            setFieldValue(`technical-${crew.id}-name`, crew.name);
            setFieldValue(`technical-${crew.id}-role`, crew.role);
        });
    }
}

function loadStep3Data() {
    if (formData.step3) {
        const contractCheckbox = document.getElementById('contract-accept');
        const kvkkCheckbox = document.getElementById('kvkk-accept');
        
        if (contractCheckbox) contractCheckbox.checked = formData.step3.contractAccepted;
        if (kvkkCheckbox) kvkkCheckbox.checked = formData.step3.kvkkAccepted;
    }
}

function loadStep4Data() {
    updateSummaryContent();
}

function updateSummaryContent() {
    updateFilmSummary();
    updateApplicantSummary();
    updateContractSummary();
}

function updateFilmSummary() {
    const container = document.getElementById('film-summary-content');
    if (!container || !formData.step1) return;
    
    const data = formData.step1;
    const isInternational = selectedCategory === 'international-competition';
    
    let content = `
        <p><strong>${isInternational ? 'Category' : 'Kategori'}:</strong> ${getCategoryDisplayName()}</p>
        <p><strong>${isInternational ? 'Original Film Name' : 'Filmin Özgün Adı'}:</strong> ${data.filmNameOriginal || '-'}</p>
        <p><strong>${isInternational ? 'Turkish Film Name' : 'Filmin Türkçe Adı'}:</strong> ${data.filmNameTurkish || '-'}</p>
        <p><strong>${isInternational ? 'Original Language' : 'Özgün Dili'}:</strong> ${data.originalLanguage || '-'}</p>
        <p><strong>${isInternational ? 'Producer Country' : 'Yapımcı Ülke'}:</strong> ${data.producerCountry || '-'}</p>
        <p><strong>${isInternational ? 'Duration' : 'Süresi'}:</strong> ${data.duration || '-'} ${isInternational ? 'minutes' : 'dakika'}</p>
        <p><strong>${isInternational ? 'Sound Information' : 'Ses Bilgisi'}:</strong> ${data.soundInfo || '-'}</p>
        <p><strong>${isInternational ? 'Music Information' : 'Müzik Bilgisi'}:</strong> ${data.musicInfo || '-'}</p>
        <p><strong>${isInternational ? 'Production Format' : 'Yapım Formatı'}:</strong> ${data.productionFormat || '-'}</p>
        <p><strong>${isInternational ? 'Production Date' : 'Yapım Tarihi'}:</strong> ${data.productionDate || '-'}</p>
        <p><strong>${isInternational ? 'Film Summary' : 'Film Özeti'}:</strong> ${data.filmSummary || '-'}</p>
        <p><strong>${isInternational ? 'Download Link' : 'İndirme Linki'}:</strong> ${data.downloadLink || '-'}</p>
    `;
    
    if (data.downloadPassword) {
        content += `<p><strong>${isInternational ? 'Download Password' : 'İndirme Şifresi'}:</strong> ${data.downloadPassword}</p>`;
    }
    
    // Add optional sections if they exist
    if (data.festivals) {
        content += `
            <div class="additional-info">
                <h5>${isInternational ? 'Participated Festivals' : 'Katıldığı Festivaller'}</h5>
                <p>${data.festivals}</p>
            </div>
        `;
    }
    
    if (data.awards) {
        content += `
            <div class="additional-info">
                <h5>${isInternational ? 'Awards Received' : 'Aldığı Ödüller'}</h5>
                <p>${data.awards}</p>
            </div>
        `;
    }
    
    if (data.socialMedia) {
        content += `
            <div class="additional-info">
                <h5>${isInternational ? 'Social Media Accounts' : 'Sosyal Medya Hesapları'}</h5>
                <p>${data.socialMedia}</p>
            </div>
        `;
    }
    
    if (data.imdbLink) {
        content += `
            <div class="additional-info">
                <h5>IMDB ${isInternational ? 'Link' : 'Linki'}</h5>
                <p><a href="${data.imdbLink}" target="_blank">${data.imdbLink}</a></p>
            </div>
        `;
    }
    
    container.innerHTML = content;
}

function updateApplicantSummary() {
    const container = document.getElementById('applicant-summary-content');
    if (!container) return;
    
    const isInternational = selectedCategory === 'international-competition';
    let content = '';
    
    // Directors
    if (formData.directors && formData.directors.length > 0) {
        formData.directors.forEach((director, index) => {
            content += `
                <div class="director-summary">
                    <h5>${isInternational ? 'Director' : 'Yönetmen'} ${index + 1}</h5>
                    <p><strong>${isInternational ? 'Name Surname' : 'Ad Soyad'}:</strong> ${director.name || 'undefined'}</p>
                    <p><strong>E-posta:</strong> ${director.email || 'undefined'}</p>
                    <p><strong>${isInternational ? 'Phone' : 'Telefon'}:</strong> ${director.phone || 'undefined'}</p>
                    <p><strong>${isInternational ? 'Address' : 'Adres'}:</strong> ${director.address || 'undefined'}</p>
                    <p><strong>${isInternational ? 'Biography' : 'Biyografi'}:</strong> ${director.bio || 'Belirtilmemiş'}</p>
                    <p><strong>${isInternational ? 'Filmography' : 'Filmografi'}:</strong> ${director.filmography || 'Belirtilmemiş'}</p>
                </div>
            `;
        });
    }
    
    // Producers
    if (formData.producers && formData.producers.length > 0) {
        content += `<h5>${isInternational ? 'Producers' : 'Yapımcılar'}</h5>`;
        formData.producers.forEach((producer, index) => {
            content += `<p>${index + 1}. ${producer.name || 'undefined'} - ${producer.role || 'undefined'}</p>`;
        });
    }
    
    // Technical Crew
    if (formData.technicalCrew && formData.technicalCrew.length > 0) {
        content += `<h5>${isInternational ? 'Technical Crew' : 'Teknik Ekip'}</h5>`;
        formData.technicalCrew.forEach((crew, index) => {
            content += `<p>${index + 1}. ${crew.name || 'undefined'} - ${crew.role || 'undefined'}</p>`;
        });
    }
    
    // Student Document
    if (selectedCategory === 'ogrenci-belgesel' && formData.studentDocument) {
        content += `
            <div class="document-summary">
                <h5>${isInternational ? 'Student Document' : 'Öğrenci Belgesi'}</h5>
                <p>✅ ${formData.studentDocument}</p>
            </div>
        `;
    }
    
    container.innerHTML = content;
}

function updateContractSummary() {
    const container = document.getElementById('contract-summary-content');
    if (!container || !formData.step3) return;
    
    const isInternational = selectedCategory === 'international-competition';
    const data = formData.step3;
    
    const content = `
        <p><strong>${isInternational ? 'Participation Agreement' : 'Katılım Sözleşmesi'}:</strong> ${data.contractAccepted ? (isInternational ? '✅ Accepted' : '✅ Kabul Edildi') : (isInternational ? '❌ Not Accepted' : '❌ Kabul Edilmedi')}</p>
        <p><strong>KVKK ${isInternational ? 'Agreement' : 'Metni'}:</strong> ${data.kvkkAccepted ? (isInternational ? '✅ Accepted' : '✅ Kabul Edildi') : (isInternational ? '❌ Not Accepted' : '❌ Kabul Edilmedi')}</p>
    `;
    
    container.innerHTML = content;
}

function editStep(stepNumber) {
    currentStep = stepNumber;
    updateProgressSteps();
    updateStepContent();
}

function getFieldValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value : '';
}

function setFieldValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field && value) {
        field.value = value;
    }
}

function addFormInputListeners() {
    // Add input event listeners for real-time validation clearing
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                
                // Remove error message if exists
                const errorMessage = this.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
    
    // Add change event listeners for checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkboxGroup = this.closest('.checkbox-group');
            if (checkboxGroup && checkboxGroup.classList.contains('error')) {
                checkboxGroup.classList.remove('error');
            }
        });
    });
}

function submitApplication() {
    // Save final step data
    saveStepData(currentStep);
    
    // Show success message
    showSuccessMessage();
}

function showSuccessMessage() {
    const stepContent = document.getElementById('step-content');
    const isInternational = selectedCategory === 'international-competition';
    
    stepContent.innerHTML = `
        <div class="success-message">
            <div class="success-icon">🎉</div>
            <h2>${isInternational ? 'Application Submitted Successfully!' : 'Başvurunuz Başarıyla Gönderildi!'}</h2>
            <p>${isInternational ? 'Your application has been received and will be reviewed by our team. You will be notified via email about the results.' : 'Başvurunuz alınmıştır ve ekibimiz tarafından değerlendirilecektir. Sonuçlar hakkında e-posta ile bilgilendirileceksiniz.'}</p>
            
            <div class="success-details">
                <p><strong>${isInternational ? 'Application Date' : 'Başvuru Tarihi'}:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>
                <p><strong>${isInternational ? 'Category' : 'Kategori'}:</strong> ${getCategoryDisplayName()}</p>
                <p><strong>${isInternational ? 'Application ID' : 'Başvuru No'}:</strong> TRT-${Date.now()}</p>
            </div>
            
            <button class="new-application-btn" onclick="startNewApplication()">
                ${isInternational ? 'Start New Application' : 'Yeni Başvuru Yap'}
            </button>
        </div>
    `;
    
    // Hide navigation buttons
    document.querySelector('.step-navigation').style.display = 'none';
}

function startNewApplication() {
    // Reset all data
    currentStep = 1;
    selectedCategory = '';
    formData = {};
    directorCount = 1;
    crewCount = 0;
    
    // Reset form
    document.getElementById('category-selection').style.display = 'block';
    document.getElementById('form-steps').style.display = 'none';
    
    // Reset category selection
    document.querySelectorAll('.category-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Reset progress steps
    updateProgressSteps();
    
    // Show navigation buttons
    document.querySelector('.step-navigation').style.display = 'flex';
}

// Technical Crew Functions
function addTechnicalCrew() {
}