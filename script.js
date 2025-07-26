// Global Variables
let currentStep = 0;
let selectedCategory = '';
let formData = {
    category: '',
    // Step 1 - Work/Project Info
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
    
    // Project Support specific fields
    programCategory: '',
    programName: '',
    programSubject: '',
    programBudget: '',
    resourcesSources: '',
    shootingLocations: '',
    downloadableProjectLink: '',
    downloadableProjectPassword: '',
    
    // Step 2 - Applicant Info
    directors: [],
    producers: [],
    scriptwriters: [],
    sponsors: [],
    salesAgents: [],
    crew: [],
    
    // Project Support participant info
    participantName: '',
    participantSurname: '',
    participantPhone: '',
    participantEmail: '',
    participantAddress: '',
    participantPreviousWork: '',
    participantBiography: '',
    participantProjectApproach: '',
    
    // Step 3 - Contract
    contractAccept: false,
    kvkkAccept: false
};

// Category configurations
const categoryConfigs = {
    'profesyonel-belgesel': {
        title: 'Profesyonel | Ulusal Belgesel Ödülleri Yarışması',
        steps: ['Eser Linki ve Bilgileri', 'Eser Sahibi Bilgileri', 'Katılım Sözleşmesi', 'Başvuru Özeti ve Onay']
    },
    'ogrenci-belgesel': {
        title: 'Öğrenci | Ulusal Belgesel Ödülleri Yarışması',
        steps: ['Eser Linki ve Bilgileri', 'Eser Sahibi Bilgileri', 'Katılım Sözleşmesi', 'Başvuru Özeti ve Onay']
    },
    'international-competition': {
        title: 'International Competition',
        steps: ['Work Link and Details', 'Applicant Information', 'Participation Agreement', 'Summary and Confirmation']
    },
    'proje-destek': {
        title: 'Proje Destek Yarışması',
        steps: ['Eser Linki ve Bilgileri', 'Eser Sahibi Bilgileri', 'Katılım Sözleşmesi', 'Başvuru Özeti ve Onay']
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateProgressSteps();
});

function initializeEventListeners() {
    // Category selection
    const categoryOptions = document.querySelectorAll('.category-option');
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Remove active class from all options
            categoryOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to selected option
            this.classList.add('active');
            
            selectedCategory = radio.value;
            formData.category = selectedCategory;
            
            // Update category display
            updateCategoryDisplay();
        });
    });

    // Start application button
    document.getElementById('start-application-btn').addEventListener('click', function() {
        if (!selectedCategory) {
            alert('Lütfen bir kategori seçiniz.');
            return;
        }
        startApplication();
    });

    // Navigation buttons
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('prev-btn').addEventListener('click', prevStep);
    document.getElementById('back-to-category-btn').addEventListener('click', backToCategorySelection);

    // Character count for textarea
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary) {
        filmSummary.addEventListener('input', updateCharacterCount);
    }
}

function updateCategoryDisplay() {
    const categoryDisplay = document.getElementById('category-display');
    if (categoryDisplay && selectedCategory) {
        const config = categoryConfigs[selectedCategory];
        categoryDisplay.textContent = config ? config.title : 'Kategori seçilmedi';
    }
}

function startApplication() {
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('form-steps').style.display = 'block';
    currentStep = 0;
    updateStep();
}

function backToCategorySelection() {
    document.getElementById('category-selection').style.display = 'block';
    document.getElementById('form-steps').style.display = 'none';
    currentStep = 0;
    updateProgressSteps();
}

function nextStep() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        if (currentStep < getMaxSteps() - 1) {
            currentStep++;
            updateStep();
        }
    }
}

function prevStep() {
    if (currentStep > 0) {
        saveCurrentStepData();
        currentStep--;
        updateStep();
    }
}

function editStep(stepIndex) {
    saveCurrentStepData();
    currentStep = stepIndex;
    updateStep();
}

function getMaxSteps() {
    const config = categoryConfigs[selectedCategory];
    return config ? config.steps.length : 4;
}

function updateStep() {
    updateProgressSteps();
    updateStepContent();
    updateNavigationButtons();
}

function updateProgressSteps() {
    const steps = document.querySelectorAll('.step');
    const config = categoryConfigs[selectedCategory];
    
    steps.forEach((step, index) => {
        const stepIcon = step.querySelector('.step-icon');
        const stepTitle = step.querySelector('.step-title');
        
        // Update step titles based on category
        if (config && config.steps[index]) {
            stepTitle.textContent = config.steps[index];
        }
        
        // Update step states
        step.classList.remove('active', 'completed');
        if (index === currentStep) {
            step.classList.add('active');
        } else if (index < currentStep) {
            step.classList.add('completed');
            stepIcon.innerHTML = '✓';
        } else {
            stepIcon.textContent = index + 1;
        }
    });
}

function updateStepContent() {
    const stepTitle = document.getElementById('step-title');
    const stepContent = document.getElementById('step-content');
    const config = categoryConfigs[selectedCategory];
    
    if (config && config.steps[currentStep]) {
        stepTitle.textContent = config.steps[currentStep];
    }
    
    // Generate content based on category and step
    stepContent.innerHTML = getStepContent(selectedCategory, currentStep);
    
    // Reinitialize event listeners for new content
    initializeStepEventListeners();
    
    // Load saved data
    loadStepData();
}

function getStepContent(category, step) {
    switch (category) {
        case 'proje-destek':
            return getProjectSupportStepContent(step);
        case 'international-competition':
            return getInternationalCompetitionStepContent(step);
        default:
            return getDefaultStepContent(step);
    }
}

function getProjectSupportStepContent(step) {
    switch (step) {
        case 0: // Eser Linki ve Bilgileri
            return `
                <div class="form-section">
                    <h3 class="section-title">Proje Bilgileri <span class="required">(Zorunlu)</span></h3>
                    
                    <!-- Program Kategorisi -->
                    <div class="form-group">
                        <label for="program-category">Program Kategorisi <span class="required">*</span></label>
                        <select id="program-category" name="program-category" class="form-select" required>
                            <option value="">Seçiniz</option>
                            <option value="proje-destek">Proje Destek Yarışması</option>
                        </select>
                    </div>

                    <!-- Program Adı ve Konusu -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="program-name">Programın Adı <span class="required">*</span></label>
                            <input type="text" id="program-name" name="program-name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="program-subject">Programın Konusu <span class="required">*</span></label>
                            <input type="text" id="program-subject" name="program-subject" class="form-input" required>
                        </div>
                    </div>

                    <!-- Bütçe ve Ülke -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="program-budget">Programın Tahmini Bütçesi <span class="required">*</span></label>
                            <input type="text" id="program-budget" name="program-budget" class="form-input" required placeholder="Örn: 50.000 TL">
                        </div>
                        <div class="form-group">
                            <label for="producer-country">Yapımcı Ülke <span class="required">*</span></label>
                            <select id="producer-country" name="producer-country" class="form-select" required>
                                <option value="">Seçiniz</option>
                                <option value="turkey">Türkiye</option>
                            </select>
                        </div>
                    </div>

                    <!-- Kaynaklar ve Çekim Yerleri -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="resources-sources">Yararlanılacak Kaynaklar/Kişiler <span class="required">*</span></label>
                            <textarea id="resources-sources" name="resources-sources" class="form-textarea" rows="4" required placeholder="Ad Soyad - Görevi/Rolü şeklinde yazınız"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="shooting-locations">Planlanan Çekim Yerleri <span class="required">*</span></label>
                            <textarea id="shooting-locations" name="shooting-locations" class="form-textarea" rows="4" required placeholder="Mekan Adı - Semt/Şehir şeklinde yazınız"></textarea>
                        </div>
                    </div>

                    <!-- İndirilebilir Proje Linki -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="downloadable-project-link">İndirilebilir Proje Sunum Linki <span class="required">*</span></label>
                            <input type="url" id="downloadable-project-link" name="downloadable-project-link" class="form-input" required>
                            <small class="form-help">Projenizi Google Drive'a yüklemeniz gerekmektedir.</small>
                        </div>
                        <div class="form-group">
                            <label for="downloadable-project-password">İndirilebilir Proje Sunum Linki Şifresi</label>
                            <input type="text" id="downloadable-project-password" name="downloadable-project-password" class="form-input">
                            <small class="form-help">İndirme için şifre gerekli değilse bu alanı boş bırakınız.</small>
                        </div>
                    </div>

                    <!-- Format Bilgisi -->
                    <div class="format-info">
                        <ul>
                            <li>Kabul edilen formatlar: mpeg2, mov, mxf, mp4</li>
                            <li>Verdiğiniz bağlantıların indirilebilir olduğundan emin olunuz. (Youtube bağlantıları kabul edilmeyecektir.)</li>
                        </ul>
                    </div>
                </div>
            `;
        case 1: // Eser Sahibi Bilgileri
            return `
                <div class="form-section">
                    <h3 class="section-title">Katılımcı Bilgileri <span class="required">(Zorunlu)</span></h3>
                    
                    <!-- Ad Soyad -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="participant-name">Ad <span class="required">*</span></label>
                            <input type="text" id="participant-name" name="participant-name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="participant-surname">Soyad <span class="required">*</span></label>
                            <input type="text" id="participant-surname" name="participant-surname" class="form-input" required>
                        </div>
                    </div>

                    <!-- Telefon ve Email -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="participant-phone">Telefon <span class="required">*</span></label>
                            <input type="tel" id="participant-phone" name="participant-phone" class="form-input" required placeholder="+90 5XX XXX XX XX">
                        </div>
                        <div class="form-group">
                            <label for="participant-email">E-Posta Adresi <span class="required">*</span></label>
                            <input type="email" id="participant-email" name="participant-email" class="form-input" required>
                        </div>
                    </div>

                    <!-- Adres -->
                    <div class="form-group">
                        <label for="participant-address">Adres <span class="required">*</span></label>
                        <textarea id="participant-address" name="participant-address" class="form-textarea" rows="3" required></textarea>
                    </div>

                    <!-- Daha Önce Yapılan İşler -->
                    <div class="form-group">
                        <label for="participant-previous-work">Katılımcının Daha Önce Yaptığı İşler <span class="required">*</span></label>
                        <textarea id="participant-previous-work" name="participant-previous-work" class="form-textarea" rows="4" required placeholder="İşin Adı - Tarihi şeklinde yazınız"></textarea>
                    </div>

                    <!-- Özgeçmiş -->
                    <div class="form-group">
                        <label for="participant-biography">Özgeçmiş <span class="required">*</span></label>
                        <textarea id="participant-biography" name="participant-biography" class="form-textarea" rows="6" required></textarea>
                    </div>

                    <!-- Projeye Yaklaşım -->
                    <div class="form-group">
                        <label for="participant-project-approach">Katılımcının Projeye Yaklaşımı/Sanatsal/Sinematografik Yaklaşımı Anlatan Açıklama <span class="required">*</span></label>
                        <textarea id="participant-project-approach" name="participant-project-approach" class="form-textarea" rows="6" required></textarea>
                    </div>
                </div>
            `;
        case 2: // Katılım Sözleşmesi
            return `
                <div class="contract-section">
                    <h3 class="section-title">Katılım Sözleşmesi</h3>
                    
                    <div class="contract-content">
                        <h3>TARAFLAR</h3>
                        <p><strong>1.1. DÜZENLEYİCİ</strong></p>
                        <p>Unvan: TÜRKİYE RADYO TELEVİZYON KURUMU ("TRT")<br>
                        Adres: TRT Genel Müdürlüğü<br>
                        E-posta: geleceginiletisimcileri@trt.net.tr<br>
                        Ticaret Sicil No: 13446<br>
                        Vergi Dairesi/No: Ankara Kurumlar Vergi Dairesi / 8790032867</p>
                        
                        <p><strong>1.2. KATILIMCI ("KATILIMCI")</strong></p>
                        <p>Grup içinde katılım olması halinde;<br>
                        İlgili Grup İsmi:<br>
                        Grup Temsilcisi:<br>
                        Grup yedek temsilcisi:</p>
                        
                        <p><strong>18 Yaşından Küçükler İçin Katılımcının Yasal Velisinin:</strong><br>
                        Ad Soyad: ("KATILIMCI VELİSİ")<br>
                        Adresi:<br>
                        Telefon:<br>
                        E-Posta:<br>
                        TC Kimlik:</p>
                        
                        <p><strong>1.3.</strong> Her iki taraf 1.1 ve 1.2. maddelerinde belirtilen adreslerini tebligat adresleri olarak kabul etmişlerdir. Adres değişikliklerini usulüne uygun şekilde karşı tarafa tebliğ edilmedikçe yukarıda bildirilen adrese yapılacak tebligat, ilgili tarafa yapılmış sayılır.</p>
                    </div>

                    <div class="contract-checkboxes">
                        <div class="checkbox-group">
                            <input type="checkbox" id="contract-accept" name="contract-accept" required>
                            <label for="contract-accept">Katılım Sözleşmesini Okudum ve Kabul Ediyorum <span class="required">*</span></label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="kvkk-accept" name="kvkk-accept" required>
                            <label for="kvkk-accept">Kişisel Verilerin Korunması Metnini Okudum ve Kabul Ediyorum <span class="required">*</span></label>
                        </div>
                    </div>
                </div>
            `;
        case 3: // Başvuru Özeti ve Onay
            return getProjectSupportSummaryContent();
        default:
            return '<p>İçerik yükleniyor...</p>';
    }
}

function getProjectSupportSummaryContent() {
    return `
        <div class="summary-section">
            <h3>Başvuru Özeti</h3>
            
            <!-- Proje Bilgileri -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Proje Bilgileri</h4>
                    <button type="button" class="edit-btn" onclick="editStep(0)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    <p><strong>Program Kategorisi:</strong> ${formData.programCategory || 'Belirtilmemiş'}</p>
                    <p><strong>Programın Adı:</strong> ${formData.programName || 'Belirtilmemiş'}</p>
                    <p><strong>Programın Konusu:</strong> ${formData.programSubject || 'Belirtilmemiş'}</p>
                    <p><strong>Tahmini Bütçe:</strong> ${formData.programBudget || 'Belirtilmemiş'}</p>
                    <p><strong>Yapımcı Ülke:</strong> ${formData.producerCountry || 'Belirtilmemiş'}</p>
                    <p><strong>Yararlanılacak Kaynaklar/Kişiler:</strong> ${formData.resourcesSources || 'Belirtilmemiş'}</p>
                    <p><strong>Planlanan Çekim Yerleri:</strong> ${formData.shootingLocations || 'Belirtilmemiş'}</p>
                    <p><strong>Proje Sunum Linki:</strong> ${formData.downloadableProjectLink || 'Belirtilmemiş'}</p>
                </div>
            </div>

            <!-- Katılımcı Bilgileri -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Katılımcı Bilgileri</h4>
                    <button type="button" class="edit-btn" onclick="editStep(1)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    <p><strong>Ad Soyad:</strong> ${formData.participantName} ${formData.participantSurname}</p>
                    <p><strong>Telefon:</strong> ${formData.participantPhone || 'Belirtilmemiş'}</p>
                    <p><strong>E-Posta:</strong> ${formData.participantEmail || 'Belirtilmemiş'}</p>
                    <p><strong>Adres:</strong> ${formData.participantAddress || 'Belirtilmemiş'}</p>
                    <p><strong>Daha Önce Yapılan İşler:</strong> ${formData.participantPreviousWork || 'Belirtilmemiş'}</p>
                    <p><strong>Özgeçmiş:</strong> ${formData.participantBiography ? (formData.participantBiography.substring(0, 100) + '...') : 'Belirtilmemiş'}</p>
                    <p><strong>Projeye Yaklaşım:</strong> ${formData.participantProjectApproach ? (formData.participantProjectApproach.substring(0, 100) + '...') : 'Belirtilmemiş'}</p>
                </div>
            </div>

            <!-- Sözleşme Onayları -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Sözleşme Onayları</h4>
                    <button type="button" class="edit-btn" onclick="editStep(2)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    <p><strong>Katılım Sözleşmesi:</strong> ${formData.contractAccept ? '✅ Kabul Edildi' : '❌ Kabul Edilmedi'}</p>
                    <p><strong>KVKK Metni:</strong> ${formData.kvkkAccept ? '✅ Kabul Edildi' : '❌ Kabul Edilmedi'}</p>
                </div>
            </div>
        </div>
    `;
}

function getInternationalCompetitionStepContent(step) {
    switch (step) {
        case 0: // Work Link and Details
            return `
                <div class="form-section">
                    <h3 class="section-title">Film Information <span class="required">(Required)</span></h3>
                    
                    <!-- Category -->
                    <div class="form-group">
                        <label for="category-display">Category</label>
                        <div id="category-display" class="category-display-field">
                            International Competition
                        </div>
                    </div>

                    <!-- Film Names -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="film-name-original">Original Title <span class="required">*</span></label>
                            <input type="text" id="film-name-original" name="film-name-original" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="film-name-turkish">English Title <span class="required">*</span></label>
                            <input type="text" id="film-name-turkish" name="film-name-turkish" class="form-input" required>
                        </div>
                    </div>

                    <!-- Language, Country, Duration -->
                    <div class="form-row form-row-three">
                        <div class="form-group">
                            <label for="original-language">Original Language <span class="required">*</span></label>
                            <select id="original-language" name="original-language" class="form-select" required>
                                <option value="">Select</option>
                                <option value="turkish">Turkish</option>
                                <option value="english">English</option>
                                <option value="french">French</option>
                                <option value="german">German</option>
                                <option value="spanish">Spanish</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="producer-country">Producer Country <span class="required">*</span></label>
                            <select id="producer-country" name="producer-country" class="form-select" required>
                                <option value="">Select</option>
                                <option value="turkey">Turkey</option>
                                <option value="usa">USA</option>
                                <option value="uk">United Kingdom</option>
                                <option value="france">France</option>
                                <option value="germany">Germany</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="duration">Duration <span class="required">*</span></label>
                            <div class="duration-input">
                                <input type="number" id="duration" name="duration" class="form-input duration-field" placeholder="00" min="1" max="999" required>
                                <span class="duration-label">Minutes</span>
                            </div>
                        </div>
                    </div>

                    <!-- Sound and Music -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="sound-info">Sound Information <span class="required">*</span></label>
                            <input type="text" id="sound-info" name="sound-info" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="music-info">Music/Original Music Information <span class="required">*</span></label>
                            <input type="text" id="music-info" name="music-info" class="form-input" required>
                        </div>
                    </div>

                    <!-- Format and Date -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="production-format">Production Format Aspect Ratio <span class="required">*</span></label>
                            <select id="production-format" name="production-format" class="form-select" required>
                                <option value="">Select</option>
                                <option value="16:9">16:9</option>
                                <option value="4:3">4:3</option>
                                <option value="21:9">21:9</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="production-date">Production Date (Month/Year) <span class="required">*</span></label>
                            <input type="month" id="production-date" name="production-date" class="form-input" required>
                        </div>
                    </div>

                    <!-- Film Summary -->
                    <div class="form-group">
                        <label for="film-summary">Film Synopsis (250-1000 Characters) <span class="required">*</span></label>
                        <textarea id="film-summary" name="film-summary" class="form-textarea" rows="6" minlength="250" maxlength="1000" required placeholder="Write your film synopsis here..."></textarea>
                        <div class="character-count">
                            <span id="char-count">0</span>/1000 characters
                        </div>
                    </div>

                    <!-- Download Link -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="download-link">Downloadable Film Link <span class="required">*</span></label>
                            <input type="url" id="download-link" name="download-link" class="form-input" required>
                            <small class="form-help">You must upload your film to Google Drive.</small>
                        </div>
                        <div class="form-group">
                            <label for="download-password">Download Link Password</label>
                            <input type="text" id="download-password" name="download-password" class="form-input">
                            <small class="form-help">Leave this field empty if no password is required for download.</small>
                        </div>
                    </div>

                    <!-- Format Info -->
                    <div class="format-info">
                        <ul>
                            <li>Accepted formats: mpeg2, mov, mxf, mp4</li>
                            <li>Make sure your links are downloadable. (YouTube links will not be accepted.)</li>
                        </ul>
                    </div>
                </div>

                <!-- Optional Sections -->
                <div class="optional-sections">
                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>Festivals Participated <span class="optional">(Optional)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('festivals')">+ Add</button>
                        </div>
                        <div id="festivals-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <textarea id="festivals" name="festivals" class="form-textarea" rows="3" placeholder="List the festivals participated..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>Awards Received <span class="optional">(Optional)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('awards')">+ Add</button>
                        </div>
                        <div id="awards-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <textarea id="awards" name="awards" class="form-textarea" rows="3" placeholder="List the awards received..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>Social Media Accounts <span class="optional">(Optional)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('social')">+ Add</button>
                        </div>
                        <div id="social-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <textarea id="social-media" name="social-media" class="form-textarea" rows="3" placeholder="List your social media accounts..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>IMDB Link <span class="optional">(Optional)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('imdb')">+ Add</button>
                        </div>
                        <div id="imdb-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <input type="url" id="imdb-link" name="imdb-link" class="form-input" placeholder="Enter your IMDB link...">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 1: // Applicant Information
            return getInternationalApplicantContent();
        case 2: // Participation Agreement
            return `
                <div class="contract-section">
                    <h3 class="section-title">Participation Agreement</h3>
                    
                    <div class="contract-content">
                        <h3>PARTIES</h3>
                        <p><strong>1.1. ORGANIZER</strong></p>
                        <p>Title: TURKISH RADIO AND TELEVISION CORPORATION ("TRT")<br>
                        Address: TRT General Directorate<br>
                        E-mail: geleceginiletisimcileri@trt.net.tr<br>
                        Trade Registry No: 13446<br>
                        Tax Office/No: Ankara Corporate Tax Office / 8790032867</p>
                        
                        <p><strong>1.2. PARTICIPANT ("PARTICIPANT")</strong></p>
                        <p>In case of group participation;<br>
                        Related Group Name:<br>
                        Group Representative:<br>
                        Group Deputy Representative:</p>
                        
                        <p><strong>For Participants Under 18 Years of Age, Legal Guardian's:</strong><br>
                        Name Surname: ("PARTICIPANT GUARDIAN")<br>
                        Address:<br>
                        Phone:<br>
                        E-Mail:<br>
                        ID Number:</p>
                        
                        <p><strong>1.3.</strong> Both parties have accepted the addresses specified in articles 1.1 and 1.2 as notification addresses. Unless address changes are properly notified to the other party, notifications made to the address stated above shall be deemed to have been made to the relevant party.</p>
                    </div>

                    <div class="contract-checkboxes">
                        <div class="checkbox-group">
                            <input type="checkbox" id="contract-accept" name="contract-accept" required>
                            <label for="contract-accept">I have read and accept the Participation Agreement <span class="required">*</span></label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="kvkk-accept" name="kvkk-accept" required>
                            <label for="kvkk-accept">I have read and accept the Personal Data Protection Text <span class="required">*</span></label>
                        </div>
                    </div>
                </div>
            `;
        case 3: // Summary and Confirmation
            return getInternationalSummaryContent();
        default:
            return '<p>Loading content...</p>';
    }
}

function getDefaultStepContent(step) {
    switch (step) {
        case 0: // Eser Linki ve Bilgileri
            return `
                <div class="form-section">
                    <h3 class="section-title">Film Bilgileri <span class="required">(Zorunlu)</span></h3>
                    
                    <!-- Kategori -->
                    <div class="form-group">
                        <label for="category-display">Kategori</label>
                        <div id="category-display" class="category-display-field">
                            ${categoryConfigs[selectedCategory]?.title || 'Kategori seçilmedi'}
                        </div>
                    </div>

                    <!-- Film Adları -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="film-name-original">Filmin Özgün Adı <span class="required">*</span></label>
                            <input type="text" id="film-name-original" name="film-name-original" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="film-name-turkish">Filmin Türkçe Adı <span class="required">*</span></label>
                            <input type="text" id="film-name-turkish" name="film-name-turkish" class="form-input" required>
                        </div>
                    </div>

                    <!-- Özgün Dil, Yapımcı Ülke, Süre -->
                    <div class="form-row form-row-three">
                        <div class="form-group">
                            <label for="original-language">Özgün Dili <span class="required">*</span></label>
                            <select id="original-language" name="original-language" class="form-select" required>
                                <option value="">Seçiniz</option>
                                <option value="turkish">Türkçe</option>
                                <option value="english">İngilizce</option>
                                <option value="french">Fransızca</option>
                                <option value="german">Almanca</option>
                                <option value="other">Diğer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="producer-country">Yapımcı Ülke <span class="required">*</span></label>
                            <select id="producer-country" name="producer-country" class="form-select" required>
                                <option value="">Seçiniz</option>
                                <option value="turkey">Türkiye</option>
                                <option value="usa">ABD</option>
                                <option value="uk">İngiltere</option>
                                <option value="france">Fransa</option>
                                <option value="germany">Almanya</option>
                                <option value="other">Diğer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="duration">Süresi <span class="required">*</span></label>
                            <div class="duration-input">
                                <input type="number" id="duration" name="duration" class="form-input duration-field" placeholder="00" min="1" max="999" required>
                                <span class="duration-label">Dakika</span>
                            </div>
                        </div>
                    </div>

                    <!-- Ses Bilgisi, Müzik Bilgisi -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="sound-info">Ses Bilgisi <span class="required">*</span></label>
                            <input type="text" id="sound-info" name="sound-info" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="music-info">Müzik/Özgün Müzik Bilgisi <span class="required">*</span></label>
                            <input type="text" id="music-info" name="music-info" class="form-input" required>
                        </div>
                    </div>

                    <!-- Yapım Formatı, Yapım Tarihi -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="production-format">Yapım Formatı Ekran Oranı <span class="required">*</span></label>
                            <select id="production-format" name="production-format" class="form-select" required>
                                <option value="">Seçiniz</option>
                                <option value="16:9">16:9</option>
                                <option value="4:3">4:3</option>
                                <option value="21:9">21:9</option>
                                <option value="other">Diğer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="production-date">Yapım Tarihi (Ay/Yıl) <span class="required">*</span></label>
                            <input type="month" id="production-date" name="production-date" class="form-input" required>
                        </div>
                    </div>

                    <!-- Film Kısa Özeti -->
                    <div class="form-group">
                        <label for="film-summary">Filmin Kısa Özeti (250-1000 Karakter) <span class="required">*</span></label>
                        <textarea id="film-summary" name="film-summary" class="form-textarea" rows="6" minlength="250" maxlength="1000" required placeholder="Filminizin kısa özetini buraya yazınız..."></textarea>
                        <div class="character-count">
                            <span id="char-count">0</span>/1000 karakter
                        </div>
                    </div>

                    <!-- İndirilebilir Film Linki -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="download-link">İndirilebilir Film Linki <span class="required">*</span></label>
                            <input type="url" id="download-link" name="download-link" class="form-input" required>
                            <small class="form-help">Filminizi Google Drive'a yüklemeniz gerekmektedir.</small>
                        </div>
                        <div class="form-group">
                            <label for="download-password">İndirilebilir Link Şifresi</label>
                            <input type="text" id="download-password" name="download-password" class="form-input">
                            <small class="form-help">İndirme için şifre gerekli değilse bu alanı boş bırakınız.</small>
                        </div>
                    </div>

                    <!-- Format Bilgisi -->
                    <div class="format-info">
                        <ul>
                            <li>Kabul edilen formatlar: mpeg2, mov, mxf, mp4</li>
                            <li>Verdiğiniz bağlantıların indirilebilir olduğundan emin olunuz. (Youtube bağlantıları kabul edilmeyecektir.)</li>
                        </ul>
                    </div>
                </div>

                <!-- Optional Sections -->
                <div class="optional-sections">
                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>Katıldığı Festivaller <span class="optional">(Opsiyonel)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('festivals')">+ Ekle</button>
                        </div>
                        <div id="festivals-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <textarea id="festivals" name="festivals" class="form-textarea" rows="3" placeholder="Katıldığı festivalleri buraya yazınız..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>Aldığı Ödüller <span class="optional">(Opsiyonel)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('awards')">+ Ekle</button>
                        </div>
                        <div id="awards-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <textarea id="awards" name="awards" class="form-textarea" rows="3" placeholder="Aldığı ödülleri buraya yazınız..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>Sosyal Medya Hesapları <span class="optional">(Opsiyonel)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('social')">+ Ekle</button>
                        </div>
                        <div id="social-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <textarea id="social-media" name="social-media" class="form-textarea" rows="3" placeholder="Sosyal medya hesaplarınızı buraya yazınız..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="optional-section">
                        <div class="optional-header">
                            <h3>IMDB Linki <span class="optional">(Opsiyonel)</span></h3>
                            <button type="button" class="add-btn" onclick="toggleSection('imdb')">+ Ekle</button>
                        </div>
                        <div id="imdb-section" class="optional-content" style="display: none;">
                            <div class="form-group">
                                <input type="url" id="imdb-link" name="imdb-link" class="form-input" placeholder="IMDB linkinizi buraya yazınız...">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 1: // Eser Sahibi Bilgileri
            return getDefaultApplicantContent();
        case 2: // Katılım Sözleşmesi
            return `
                <div class="contract-section">
                    <h3 class="section-title">Katılım Sözleşmesi</h3>
                    
                    <div class="contract-content">
                        <h3>TARAFLAR</h3>
                        <p><strong>1.1. DÜZENLEYİCİ</strong></p>
                        <p>Unvan: TÜRKİYE RADYO TELEVİZYON KURUMU ("TRT")<br>
                        Adres: TRT Genel Müdürlüğü<br>
                        E-posta: geleceginiletisimcileri@trt.net.tr<br>
                        Ticaret Sicil No: 13446<br>
                        Vergi Dairesi/No: Ankara Kurumlar Vergi Dairesi / 8790032867</p>
                        
                        <p><strong>1.2. KATILIMCI ("KATILIMCI")</strong></p>
                        <p>Grup içinde katılım olması halinde;<br>
                        İlgili Grup İsmi:<br>
                        Grup Temsilcisi:<br>
                        Grup yedek temsilcisi:</p>
                        
                        <p><strong>18 Yaşından Küçükler İçin Katılımcının Yasal Velisinin:</strong><br>
                        Ad Soyad: ("KATILIMCI VELİSİ")<br>
                        Adresi:<br>
                        Telefon:<br>
                        E-Posta:<br>
                        TC Kimlik:</p>
                        
                        <p><strong>1.3.</strong> Her iki taraf 1.1 ve 1.2. maddelerinde belirtilen adreslerini tebligat adresleri olarak kabul etmişlerdir. Adres değişikliklerini usulüne uygun şekilde karşı tarafa tebliğ edilmedikçe yukarıda bildirilen adrese yapılacak tebligat, ilgili tarafa yapılmış sayılır.</p>
                    </div>

                    <div class="contract-checkboxes">
                        <div class="checkbox-group">
                            <input type="checkbox" id="contract-accept" name="contract-accept" required>
                            <label for="contract-accept">Katılım Sözleşmesini Okudum ve Kabul Ediyorum <span class="required">*</span></label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="kvkk-accept" name="kvkk-accept" required>
                            <label for="kvkk-accept">Kişisel Verilerin Korunması Metnini Okudum ve Kabul Ediyorum <span class="required">*</span></label>
                        </div>
                    </div>
                </div>
            `;
        case 3: // Başvuru Özeti ve Onay
            return getDefaultSummaryContent();
        default:
            return '<p>İçerik yükleniyor...</p>';
    }
}

function initializeStepEventListeners() {
    // Character count for textarea
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary) {
        filmSummary.addEventListener('input', updateCharacterCount);
        updateCharacterCount(); // Initial count
    }

    // Phone validation for project support
    const participantPhone = document.getElementById('participant-phone');
    if (participantPhone) {
        participantPhone.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('90')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+90' + value.substring(1);
            } else if (!value.startsWith('+90')) {
                value = '+90' + value;
            }
            this.value = value;
        });
    }
}

function updateCharacterCount() {
    const textarea = document.getElementById('film-summary');
    const counter = document.getElementById('char-count');
    if (textarea && counter) {
        counter.textContent = textarea.value.length;
    }
}

function toggleSection(sectionName) {
    const section = document.getElementById(sectionName + '-section');
    const button = event.target;
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
        button.textContent = '- Kaldır';
        button.classList.add('remove-btn');
        button.classList.remove('add-btn');
    } else {
        section.style.display = 'none';
        button.textContent = '+ Ekle';
        button.classList.add('add-btn');
        button.classList.remove('remove-btn');
        
        // Clear the content when removing
        const textarea = section.querySelector('textarea');
        const input = section.querySelector('input');
        if (textarea) textarea.value = '';
        if (input) input.value = '';
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const backToCategoryBtn = document.getElementById('back-to-category-btn');
    
    // Show/hide back to category button only on first step
    if (currentStep === 0) {
        backToCategoryBtn.style.display = 'block';
        prevBtn.style.display = 'none';
    } else {
        backToCategoryBtn.style.display = 'none';
        prevBtn.style.display = 'block';
    }
    
    // Update next button text for last step
    if (currentStep === getMaxSteps() - 1) {
        if (selectedCategory === 'proje-destek') {
            nextBtn.textContent = 'Kaydet';
        } else if (selectedCategory === 'international-competition') {
            nextBtn.textContent = 'Submit Application';
        } else {
            nextBtn.textContent = 'Başvuruyu Gönder';
        }
        nextBtn.classList.add('submit-btn');
    } else {
        if (selectedCategory === 'international-competition') {
            nextBtn.textContent = 'Next';
        } else {
            nextBtn.textContent = 'İleri';
        }
        nextBtn.classList.remove('submit-btn');
    }
}

function validateCurrentStep() {
    const requiredFields = document.querySelectorAll('#step-content [required]');
    let isValid = true;
    let firstInvalidField = null;

    // Clear previous error states
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.validation-alert').forEach(el => el.remove());

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        }
    });

    // Special validation for project support phone
    if (selectedCategory === 'proje-destek' && currentStep === 1) {
        const phoneField = document.getElementById('participant-phone');
        if (phoneField && phoneField.value && !phoneField.value.startsWith('+90')) {
            isValid = false;
            showFieldError(phoneField, 'Telefon numarası +90 ile başlamalıdır');
            if (!firstInvalidField) {
                firstInvalidField = phoneField;
            }
        }
    }

    // Character count validation for film summary
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary && filmSummary.hasAttribute('required')) {
        const length = filmSummary.value.length;
        if (length < 250 || length > 1000) {
            isValid = false;
            showFieldError(filmSummary, 'Özet 250-1000 karakter arasında olmalıdır');
            if (!firstInvalidField) {
                firstInvalidField = filmSummary;
            }
        }
    }

    if (!isValid) {
        showValidationAlert();
        if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        showFieldError(field, 'Bu alan zorunludur');
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        showFieldError(field, 'Geçerli bir e-posta adresi giriniz');
    } else if (field.type === 'url' && value && !isValidUrl(value)) {
        isValid = false;
        showFieldError(field, 'Geçerli bir URL giriniz');
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
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
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function saveCurrentStepData() {
    const inputs = document.querySelectorAll('#step-content input, #step-content select, #step-content textarea');
    
    inputs.forEach(input => {
        const name = input.name || input.id;
        if (name) {
            if (input.type === 'checkbox') {
                formData[toCamelCase(name)] = input.checked;
            } else {
                formData[toCamelCase(name)] = input.value;
            }
        }
    });
}

function loadStepData() {
    const inputs = document.querySelectorAll('#step-content input, #step-content select, #step-content textarea');
    
    inputs.forEach(input => {
        const name = input.name || input.id;
        if (name) {
            const camelCaseName = toCamelCase(name);
            if (formData.hasOwnProperty(camelCaseName)) {
                if (input.type === 'checkbox') {
                    input.checked = formData[camelCaseName];
                } else {
                    input.value = formData[camelCaseName];
                }
            }
        }
    });

    // Update character count if film summary exists
    updateCharacterCount();
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, function(match, letter) {
        return letter.toUpperCase();
    });
}

function submitApplication() {
    saveCurrentStepData();
    
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    
    // Show success message
    const stepContent = document.getElementById('step-content');
    const navigation = document.querySelector('.step-navigation');
    
    let successMessage = '';
    if (selectedCategory === 'proje-destek') {
        successMessage = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>Başvurunuz Başarıyla Kaydedildi!</h2>
                <p>Proje Destek Yarışması başvurunuz başarıyla alınmıştır. Başvuru sürecinde size e-posta ile bilgilendirme yapılacaktır.</p>
                <div class="success-details">
                    <p><strong>Başvuru Kategorisi:</strong> ${categoryConfigs[selectedCategory].title}</p>
                    <p><strong>Başvuru Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>
                </div>
                <button class="new-application-btn" onclick="location.reload()">Yeni Başvuru Yap</button>
            </div>
        `;
    } else if (selectedCategory === 'international-competition') {
        successMessage = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>Application Successfully Submitted!</h2>
                <p>Your International Competition application has been successfully received. You will be notified via email during the application process.</p>
                <div class="success-details">
                    <p><strong>Application Category:</strong> ${categoryConfigs[selectedCategory].title}</p>
                    <p><strong>Application Date:</strong> ${new Date().toLocaleDateString('en-US')}</p>
                </div>
                <button class="new-application-btn" onclick="location.reload()">New Application</button>
            </div>
        `;
    } else {
        successMessage = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>Başvurunuz Başarıyla Gönderildi!</h2>
                <p>Başvurunuz başarıyla alınmıştır. Başvuru sürecinde size e-posta ile bilgilendirme yapılacaktır.</p>
                <div class="success-details">
                    <p><strong>Başvuru Kategorisi:</strong> ${categoryConfigs[selectedCategory].title}</p>
                    <p><strong>Başvuru Tarihi:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>
                </div>
                <button class="new-application-btn" onclick="location.reload()">Yeni Başvuru Yap</button>
            </div>
        `;
    }
    
    stepContent.innerHTML = successMessage;
    navigation.style.display = 'none';
}

// Handle final submission
function handleFinalSubmission() {
    if (currentStep === getMaxSteps() - 1) {
        // Validate contract checkboxes for final step
        const contractAccept = document.getElementById('contract-accept');
        const kvkkAccept = document.getElementById('kvkk-accept');
        
        if (contractAccept && !contractAccept.checked) {
            showFieldError(contractAccept, 'Katılım sözleşmesini kabul etmelisiniz');
            return false;
        }
        
        if (kvkkAccept && !kvkkAccept.checked) {
            showFieldError(kvkkAccept, 'KVKK metnini kabul etmelisiniz');
            return false;
        }
        
        submitApplication();
        return true;
    }
    return false;
}

// Override nextStep for final submission
const originalNextStep = nextStep;
nextStep = function() {
    if (currentStep === getMaxSteps() - 1) {
        if (validateCurrentStep()) {
            handleFinalSubmission();
        }
    } else {
        originalNextStep();
    }
};

// Helper functions for International Competition
function getInternationalApplicantContent() {
    return `
        <div class="form-section">
            <div class="section-header">
                <h3 class="section-title">Director Information <span class="required">(Required - At least 1)</span></h3>
                <button type="button" class="add-btn" onclick="addDirector()">+ Add Director</button>
            </div>
            <div id="directors-container"></div>
        </div>

        <div class="optional-sections">
            <div class="optional-section">
                <div class="optional-header">
                    <h3>Producer <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('producers')">+ Add</button>
                </div>
                <div id="producers-section" class="optional-content" style="display: none;">
                    <div id="producers-container"></div>
                    <button type="button" class="add-btn" onclick="addProducer()">+ Add Producer</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Scriptwriter <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('scriptwriters')">+ Add</button>
                </div>
                <div id="scriptwriters-section" class="optional-content" style="display: none;">
                    <div id="scriptwriters-container"></div>
                    <button type="button" class="add-btn" onclick="addScriptwriter()">+ Add Scriptwriter</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Supporting Institution <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('sponsors')">+ Add</button>
                </div>
                <div id="sponsors-section" class="optional-content" style="display: none;">
                    <div id="sponsors-container"></div>
                    <button type="button" class="add-btn" onclick="addSponsor()">+ Add Institution</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Sales Agent <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('salesAgents')">+ Add</button>
                </div>
                <div id="salesAgents-section" class="optional-content" style="display: none;">
                    <div id="salesAgents-container"></div>
                    <button type="button" class="add-btn" onclick="addSalesAgent()">+ Add Sales Agent</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Technical Crew <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('crew')">+ Add</button>
                </div>
                <div id="crew-section" class="optional-content" style="display: none;">
                    <div id="crew-container"></div>
                    <button type="button" class="add-btn" onclick="addCrew()">+ Add Crew Member</button>
                </div>
            </div>
        </div>
    `;
}

function getInternationalSummaryContent() {
    return `
        <div class="summary-section">
            <h3>Application Summary</h3>
            
            <!-- Film Information -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Film Information</h4>
                    <button type="button" class="edit-btn" onclick="editStep(0)">✏️ Edit</button>
                </div>
                <div class="summary-content">
                    <p><strong>Category:</strong> International Competition</p>
                    <p><strong>Original Title:</strong> ${formData.filmNameOriginal || 'Not specified'}</p>
                    <p><strong>English Title:</strong> ${formData.filmNameTurkish || 'Not specified'}</p>
                    <p><strong>Original Language:</strong> ${formData.originalLanguage || 'Not specified'}</p>
                    <p><strong>Producer Country:</strong> ${formData.producerCountry || 'Not specified'}</p>
                    <p><strong>Duration:</strong> ${formData.duration ? formData.duration + ' minutes' : 'Not specified'}</p>
                    <p><strong>Production Date:</strong> ${formData.productionDate || 'Not specified'}</p>
                    <p><strong>Synopsis:</strong> ${formData.filmSummary ? (formData.filmSummary.substring(0, 100) + '...') : 'Not specified'}</p>
                    <p><strong>Download Link:</strong> ${formData.downloadLink || 'Not specified'}</p>
                    ${getAdditionalInfoSummary()}
                </div>
            </div>

            <!-- Applicant Information -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Applicant Information</h4>
                    <button type="button" class="edit-btn" onclick="editStep(1)">✏️ Edit</button>
                </div>
                <div class="summary-content">
                    ${getDirectorsSummary()}
                    ${getOptionalPersonsSummary()}
                </div>
            </div>

            <!-- Agreement Confirmations -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Agreement Confirmations</h4>
                    <button type="button" class="edit-btn" onclick="editStep(2)">✏️ Edit</button>
                </div>
                <div class="summary-content">
                    <p><strong>Participation Agreement:</strong> ${formData.contractAccept ? '✅ Accepted' : '❌ Not Accepted'}</p>
                    <p><strong>Personal Data Protection:</strong> ${formData.kvkkAccept ? '✅ Accepted' : '❌ Not Accepted'}</p>
                </div>
            </div>
        </div>
    `;
}

function getDefaultApplicantContent() {
    return `
        <div class="form-section">
            <div class="section-header">
                <h3 class="section-title">Yönetmen Bilgileri <span class="required">(Zorunlu - En az 1)</span></h3>
                <button type="button" class="add-btn" onclick="addDirector()">+ Yönetmen Ekle</button>
            </div>
            <div id="directors-container"></div>
        </div>

        <div class="optional-sections">
            <div class="optional-section">
                <div class="optional-header">
                    <h3>Yapımcı <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('producers')">+ Ekle</button>
                </div>
                <div id="producers-section" class="optional-content" style="display: none;">
                    <div id="producers-container"></div>
                    <button type="button" class="add-btn" onclick="addProducer()">+ Yapımcı Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Metin Yazarı <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('scriptwriters')">+ Ekle</button>
                </div>
                <div id="scriptwriters-section" class="optional-content" style="display: none;">
                    <div id="scriptwriters-container"></div>
                    <button type="button" class="add-btn" onclick="addScriptwriter()">+ Metin Yazarı Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Sponsor <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('sponsors')">+ Ekle</button>
                </div>
                <div id="sponsors-section" class="optional-content" style="display: none;">
                    <div id="sponsors-container"></div>
                    <button type="button" class="add-btn" onclick="addSponsor()">+ Sponsor Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Satış Yetkilisi <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('salesAgents')">+ Ekle</button>
                </div>
                <div id="salesAgents-section" class="optional-content" style="display: none;">
                    <div id="salesAgents-container"></div>
                    <button type="button" class="add-btn" onclick="addSalesAgent()">+ Satış Yetkilisi Ekle</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Teknik Ekip <span class="optional">(Opsiyonel)</span></h3>
                    <button type="button" class="add-btn" onclick="togglePersonSection('crew')">+ Ekle</button>
                </div>
                <div id="crew-section" class="optional-content" style="display: none;">
                    <div id="crew-container"></div>
                    <button type="button" class="add-btn" onclick="addCrew()">+ Ekip Üyesi Ekle</button>
                </div>
            </div>
        </div>
    `;
}

function getDefaultSummaryContent() {
    return `
        <div class="summary-section">
            <h3>Başvuru Özeti</h3>
            
            <!-- Film Bilgileri -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Film Bilgileri</h4>
                    <button type="button" class="edit-btn" onclick="editStep(0)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    <p><strong>Kategori:</strong> ${categoryConfigs[selectedCategory]?.title || 'Belirtilmemiş'}</p>
                    <p><strong>Özgün Adı:</strong> ${formData.filmNameOriginal || 'Belirtilmemiş'}</p>
                    <p><strong>Türkçe Adı:</strong> ${formData.filmNameTurkish || 'Belirtilmemiş'}</p>
                    <p><strong>Özgün Dili:</strong> ${formData.originalLanguage || 'Belirtilmemiş'}</p>
                    <p><strong>Yapımcı Ülke:</strong> ${formData.producerCountry || 'Belirtilmemiş'}</p>
                    <p><strong>Süresi:</strong> ${formData.duration ? formData.duration + ' dakika' : 'Belirtilmemiş'}</p>
                    <p><strong>Yapım Tarihi:</strong> ${formData.productionDate || 'Belirtilmemiş'}</p>
                    <p><strong>Kısa Özet:</strong> ${formData.filmSummary ? (formData.filmSummary.substring(0, 100) + '...') : 'Belirtilmemiş'}</p>
                    <p><strong>İndirme Linki:</strong> ${formData.downloadLink || 'Belirtilmemiş'}</p>
                    ${getAdditionalInfoSummary()}
                </div>
            </div>

            <!-- Başvuru Sahibi Bilgileri -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Başvuru Sahibi Bilgileri</h4>
                    <button type="button" class="edit-btn" onclick="editStep(1)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    ${getDirectorsSummary()}
                    ${getOptionalPersonsSummary()}
                </div>
            </div>

            <!-- Sözleşme Onayları -->
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Sözleşme Onayları</h4>
                    <button type="button" class="edit-btn" onclick="editStep(2)">✏️ Düzenle</button>
                </div>
                <div class="summary-content">
                    <p><strong>Katılım Sözleşmesi:</strong> ${formData.contractAccept ? '✅ Kabul Edildi' : '❌ Kabul Edilmedi'}</p>
                    <p><strong>KVKK Metni:</strong> ${formData.kvkkAccept ? '✅ Kabul Edildi' : '❌ Kabul Edilmedi'}</p>
                </div>
            </div>
        </div>
    `;
}

// Helper functions for summary content
function getAdditionalInfoSummary() {
    let summary = '';
    
    if (formData.festivals) {
        summary += `<div class="additional-info"><h5>Katıldığı Festivaller:</h5><p>${formData.festivals}</p></div>`;
    }
    
    if (formData.awards) {
        summary += `<div class="additional-info"><h5>Aldığı Ödüller:</h5><p>${formData.awards}</p></div>`;
    }
    
    if (formData.socialMedia) {
        summary += `<div class="additional-info"><h5>Sosyal Medya:</h5><p>${formData.socialMedia}</p></div>`;
    }
    
    if (formData.imdbLink) {
        summary += `<div class="additional-info"><h5>IMDB:</h5><p><a href="${formData.imdbLink}" target="_blank">${formData.imdbLink}</a></p></div>`;
    }
    
    return summary;
}

function getDirectorsSummary() {
    if (formData.directors.length === 0) {
        return '<p><strong>Yönetmen:</strong> Belirtilmemiş</p>';
    }
    
    let summary = '';
    formData.directors.forEach((director, index) => {
        summary += `
            <div class="director-summary">
                <h5>Yönetmen ${index + 1}</h5>
                <p><strong>Ad Soyad:</strong> ${director.name} ${director.surname}</p>
                <p><strong>E-posta:</strong> ${director.email}</p>
                <p><strong>Telefon:</strong> ${director.phone}</p>
                <p><strong>Adres:</strong> ${director.address}</p>
                <p><strong>Biyografi:</strong> ${director.biography ? (director.biography.substring(0, 100) + '...') : 'Belirtilmemiş'}</p>
                <p><strong>Filmografi:</strong> ${director.filmography ? (director.filmography.substring(0, 100) + '...') : 'Belirtilmemiş'}</p>
            </div>
        `;
    });
    
    return summary;
}

function getOptionalPersonsSummary() {
    let summary = '';
    
    ['producers', 'scriptwriters', 'sponsors', 'salesAgents', 'crew'].forEach(type => {
        if (formData[type] && formData[type].length > 0) {
            const typeNames = {
                'producers': 'Yapımcı',
                'scriptwriters': 'Metin Yazarı',
                'sponsors': 'Sponsor',
                'salesAgents': 'Satış Yetkilisi',
                'crew': 'Teknik Ekip'
            };
            
            summary += `<div class="additional-info"><h5>${typeNames[type]}:</h5>`;
            formData[type].forEach((person, index) => {
                summary += `<p>${index + 1}. ${person.name} ${person.surname} - ${person.email}</p>`;
            });
            summary += '</div>';
        }
    });
    
    return summary;
}

// Person management functions (simplified for this implementation)
function togglePersonSection(sectionName) {
    const section = document.getElementById(sectionName + '-section');
    const button = event.target;
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
        button.textContent = '- Kaldır';
        button.classList.add('remove-btn');
        button.classList.remove('add-btn');
    } else {
        section.style.display = 'none';
        button.textContent = '+ Ekle';
        button.classList.add('add-btn');
        button.classList.remove('remove-btn');
        
        // Clear the data when removing
        formData[sectionName] = [];
        const container = document.getElementById(sectionName + '-container');
        if (container) container.innerHTML = '';
    }
}

function addDirector() {
    // Simplified implementation - in real app, this would create dynamic forms
    if (!formData.directors) formData.directors = [];
    formData.directors.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        filmography: ''
    });
    console.log('Director added. Total directors:', formData.directors.length);
}

function addProducer() {
    if (!formData.producers) formData.producers = [];
    formData.producers.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        filmography: ''
    });
    console.log('Producer added. Total producers:', formData.producers.length);
}

function addScriptwriter() {
    if (!formData.scriptwriters) formData.scriptwriters = [];
    formData.scriptwriters.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        filmography: ''
    });
    console.log('Scriptwriter added. Total scriptwriters:', formData.scriptwriters.length);
}

function addSponsor() {
    if (!formData.sponsors) formData.sponsors = [];
    formData.sponsors.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        filmography: ''
    });
    console.log('Sponsor added. Total sponsors:', formData.sponsors.length);
}

function addSalesAgent() {
    if (!formData.salesAgents) formData.salesAgents = [];
    formData.salesAgents.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        filmography: ''
    });
    console.log('Sales agent added. Total sales agents:', formData.salesAgents.length);
}

function addCrew() {
    if (!formData.crew) formData.crew = [];
    formData.crew.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        filmography: ''
    });
    console.log('Crew member added. Total crew:', formData.crew.length);
}