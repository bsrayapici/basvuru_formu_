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
    producers: [],
    scriptwriters: [],
    sponsors: [],
    salesAgents: [],
    crew: [],
    contractAccepted: false,
    kvkkAccepted: false
};

// Step configuration
const steps = [
    {
        title: 'Eser Linki ve Bilgileri',
        content: 'step1-content',
        titleEn: 'Work Link and Details'
    },
    {
        title: 'Eser Sahibi Bilgileri',
        content: 'step2-content',
        titleEn: 'Applicant Information'
    },
    {
        title: 'Katılım Sözleşmesi',
        content: 'step3-content',
        titleEn: 'Participation Agreement'
    },
    {
        title: 'Başvuru Özeti ve Onay',
        content: 'step4-content',
        titleEn: 'Summary and Confirmation'
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
        producers: [],
        scriptwriters: [],
        sponsors: [],
        salesAgents: [],
        crew: [],
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
        if (selectedCategory === 'international-competition') {
            stepTitle.textContent = steps[stepIndex].titleEn;
        } else {
            stepTitle.textContent = steps[stepIndex].title;
        }
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
            if (selectedCategory === 'international-competition') {
                stepContent.innerHTML = getStep1InternationalContent();
            }
            // For other categories, Step 1 content is already in HTML
            break;
        case 1:
            if (selectedCategory === 'international-competition') {
                stepContent.innerHTML = getStep2InternationalContent();
            } else {
                stepContent.innerHTML = getStep2Content();
            }
            initializeStep2();
            break;
        case 2:
            if (selectedCategory === 'international-competition') {
                stepContent.innerHTML = getStep3InternationalContent();
            } else {
                stepContent.innerHTML = getStep3Content();
            }
            break;
        case 3:
            if (selectedCategory === 'international-competition') {
                stepContent.innerHTML = getStep4InternationalContent();
            } else {
                stepContent.innerHTML = getStep4Content();
            }
            break;
    }
}

function getStep1InternationalContent() {
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
                    <label for="film-name-original">Original Title</label>
                    <input type="text" id="film-name-original" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="film-name-turkish">English Title</label>
                    <input type="text" id="film-name-turkish" class="form-input" required>
                </div>
            </div>

            <!-- Original Language, Producer Country, Duration -->
            <div class="form-row form-row-three">
                <div class="form-group">
                    <label for="original-language">Original Language</label>
                    <select id="original-language" class="form-select" required>
                        <option value="">Select</option>
                        <option value="english">English</option>
                        <option value="turkish">Turkish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="spanish">Spanish</option>
                        <option value="italian">Italian</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="producer-country">Producer Country</label>
                    <select id="producer-country" class="form-select" required>
                        <option value="">Select</option>
                        <option value="turkey">Turkey</option>
                        <option value="usa">USA</option>
                        <option value="uk">United Kingdom</option>
                        <option value="france">France</option>
                        <option value="germany">Germany</option>
                        <option value="spain">Spain</option>
                        <option value="italy">Italy</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="duration">Duration</label>
                    <div class="duration-input">
                        <input type="number" id="duration" class="form-input duration-field" placeholder="00" min="1" max="999" required>
                        <span class="duration-label">Minutes</span>
                    </div>
                </div>
            </div>

            <!-- Sound Info, Music Info -->
            <div class="form-row">
                <div class="form-group">
                    <label for="sound-info">Sound Information</label>
                    <input type="text" id="sound-info" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="music-info">Music/Original Music Information</label>
                    <input type="text" id="music-info" class="form-input" required>
                </div>
            </div>

            <!-- Production Format, Production Date -->
            <div class="form-row">
                <div class="form-group">
                    <label for="production-format">Production Format Aspect Ratio</label>
                    <select id="production-format" class="form-select" required>
                        <option value="">Select</option>
                        <option value="16:9">16:9</option>
                        <option value="4:3">4:3</option>
                        <option value="21:9">21:9</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="production-date">Production Date (MM/YYYY)</label>
                    <input type="month" id="production-date" class="form-input" required>
                </div>
            </div>

            <!-- Film Summary -->
            <div class="form-group">
                <label for="film-summary">Film Synopsis (250-1000 Characters)</label>
                <textarea id="film-summary" class="form-textarea" rows="6" minlength="250" maxlength="1000" required placeholder="Write your film synopsis here..."></textarea>
                <div class="character-count">
                    <span id="char-count">0</span>/1000 characters
                </div>
            </div>

            <!-- Download Link -->
            <div class="form-row">
                <div class="form-group">
                    <label for="download-link">Downloadable Film Link</label>
                    <input type="url" id="download-link" class="form-input" required>
                    <small class="form-help">-You must upload your film to Google Drive.</small>
                </div>
                <div class="form-group">
                    <label for="download-password">Download Link Password</label>
                    <input type="text" id="download-password" class="form-input">
                    <small class="form-help">-Leave this field empty if no password is required for download.</small>
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
                        <textarea id="festivals" class="form-textarea" rows="3" placeholder="List the festivals your film participated in..."></textarea>
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
                        <textarea id="awards" class="form-textarea" rows="3" placeholder="List the awards your film received..."></textarea>
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
                        <textarea id="social-media" class="form-textarea" rows="3" placeholder="List your social media accounts..."></textarea>
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
                        <input type="url" id="imdb-link" class="form-input" placeholder="Enter your IMDB link...">
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStep2InternationalContent() {
    return `
        <div class="form-section">
            <h3 class="section-title">Director Information <span class="required">(Required)</span></h3>
            <div id="directors-container">
                <div class="director-form" data-director="0">
                    <div class="director-header">
                        <h4>1st Director</h4>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-input director-name" required>
                        </div>
                        <div class="form-group">
                            <label>Surname</label>
                            <input type="text" class="form-input director-surname" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-input director-email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" class="form-input director-phone" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea class="form-textarea director-address" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Biography</label>
                        <textarea class="form-textarea director-biography" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Filmography</label>
                        <textarea class="form-textarea director-filmography" rows="4" required></textarea>
                    </div>
                </div>
            </div>
            <button type="button" class="add-btn" onclick="addDirectorInternational()">+ Add Director</button>
        </div>

        <!-- Optional Sections -->
        <div class="optional-sections">
            <div class="optional-section">
                <div class="optional-header">
                    <h3>Producer Information <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('producer')">+ Add</button>
                </div>
                <div id="producer-section" class="optional-content" style="display: none;">
                    <div id="producers-container"></div>
                    <button type="button" class="add-btn" onclick="addProducerInternational()">+ Add Producer</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Scriptwriter Information <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('scriptwriter')">+ Add</button>
                </div>
                <div id="scriptwriter-section" class="optional-content" style="display: none;">
                    <div id="scriptwriters-container"></div>
                    <button type="button" class="add-btn" onclick="addScriptwriterInternational()">+ Add Scriptwriter</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Supporting Institution/Organization <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('sponsors')">+ Add</button>
                </div>
                <div id="sponsors-section" class="optional-content" style="display: none;">
                    <div id="sponsors-container"></div>
                    <button type="button" class="add-btn" onclick="addSponsorInternational()">+ Add Institution/Organization</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Sales Agent <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('salesagent')">+ Add</button>
                </div>
                <div id="salesagent-section" class="optional-content" style="display: none;">
                    <div id="salesagents-container"></div>
                    <button type="button" class="add-btn" onclick="addSalesAgentInternational()">+ Add Sales Agent</button>
                </div>
            </div>

            <div class="optional-section">
                <div class="optional-header">
                    <h3>Technical Crew <span class="optional">(Optional)</span></h3>
                    <button type="button" class="add-btn" onclick="toggleSection('crew')">+ Add</button>
                </div>
                <div id="crew-section" class="optional-content" style="display: none;">
                    <div id="crew-container"></div>
                    <button type="button" class="add-btn" onclick="addCrewMemberInternational()">+ Add Crew Member</button>
                </div>
            </div>
        </div>
    `;
}

function getStep3InternationalContent() {
    return `
        <div class="contract-section">
            <h3>Participation Agreement</h3>
            <div class="contract-content">
                <h3>TRT Documentary Awards Participation Agreement</h3>
                <p>This agreement sets out the terms and conditions for participation in the TRT Documentary Awards competition.</p>
                <p>Participation in the competition is voluntary and by participating you declare that you accept the following conditions:</p>
                <p>1. You declare that the submitted works are original and that the copyrights belong to you.</p>
                <p>2. You give permission for your work to be evaluated within the scope of the competition and to be published if deemed necessary.</p>
                <p>3. You agree not to object to the competition results.</p>
                <p>4. You declare that you have read and accepted the information text regarding the processing of your personal data.</p>
            </div>
            <div class="contract-checkboxes">
                <div class="checkbox-group">
                    <input type="checkbox" id="contract-accept" required>
                    <label for="contract-accept">I have read and accept the participation agreement.</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="kvkk-accept" required>
                    <label for="kvkk-accept">I accept the processing of my personal data within the scope of GDPR.</label>
                </div>
            </div>
        </div>
    `;
}

function getStep4InternationalContent() {
    return `
        <div class="summary-section">
            <h3>Application Summary</h3>
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Film Information</h4>
                    <button type="button" class="edit-btn" onclick="editStep(0)">✏️ Edit</button>
                </div>
                <div class="summary-content">
                    <p><strong>Category:</strong> International Competition</p>
                    <p><strong>Original Title:</strong> ${formData.filmNameOriginal}</p>
                    <p><strong>English Title:</strong> ${formData.filmNameTurkish}</p>
                    <p><strong>Duration:</strong> ${formData.duration} minutes</p>
                    <p><strong>Production Date:</strong> ${formData.productionDate}</p>
                </div>
            </div>
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Director Information</h4>
                    <button type="button" class="edit-btn" onclick="editStep(1)">✏️ Edit</button>
                </div>
                <div class="summary-content">
                    ${formData.directors.map((director, index) => `
                        <div class="director-summary">
                            <h5>${index + 1}. Director</h5>
                            <p><strong>Name:</strong> ${director.name} ${director.surname}</p>
                            <p><strong>Email:</strong> ${director.email}</p>
                            <p><strong>Phone:</strong> ${director.phone}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="summary-item">
                <div class="summary-header">
                    <h4>Agreement Confirmations</h4>
                    <button type="button" class="edit-btn" onclick="editStep(2)">✏️ Edit</button>
                </div>
                <div class="summary-content">
                    <p><strong>Participation Agreement:</strong> ${formData.contractAccepted ? 'Accepted' : 'Not Accepted'}</p>
                    <p><strong>GDPR Consent:</strong> ${formData.kvkkAccepted ? 'Accepted' : 'Not Accepted'}</p>
                </div>
            </div>
        </div>
    `;
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
            address: '',
            biography: '',
            filmography: ''
        });
    }
    
    // Initialize character count for film summary if on step 1
    const filmSummary = document.getElementById('film-summary');
    if (filmSummary) {
        filmSummary.addEventListener('input', updateCharacterCount);
        updateCharacterCount(); // Initialize count
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
        address: '',
        biography: '',
        filmography: ''
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

function addDirectorInternational() {
    const directorsContainer = document.getElementById('directors-container');
    const directorIndex = formData.directors.length;
    
    formData.directors.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        filmography: ''
    });

    const directorForm = document.createElement('div');
    directorForm.className = 'director-form';
    directorForm.setAttribute('data-director', directorIndex);
    directorForm.innerHTML = `
        <div class="director-header">
            <h4>${directorIndex + 1}. Director</h4>
            <button type="button" class="remove-btn" onclick="removeDirector(${directorIndex})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-input director-name" required>
            </div>
            <div class="form-group">
                <label>Surname</label>
                <input type="text" class="form-input director-surname" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-input director-email" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" class="form-input director-phone" required>
            </div>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea class="form-textarea director-address" rows="3" required></textarea>
        </div>
        <div class="form-group">
            <label>Biography</label>
            <textarea class="form-textarea director-biography" rows="4" required></textarea>
        </div>
        <div class="form-group">
            <label>Filmography</label>
            <textarea class="form-textarea director-filmography" rows="4" required></textarea>
        </div>
    `;
    
    directorsContainer.appendChild(directorForm);
}

// Producer functions for International Competition
function addProducerInternational() {
    const producersContainer = document.getElementById('producers-container');
    const producerIndex = formData.producers.length;
    
    formData.producers.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    });

    const producerForm = document.createElement('div');
    producerForm.className = 'person-form';
    producerForm.setAttribute('data-producer', producerIndex);
    producerForm.innerHTML = `
        <div class="person-header">
            <h5>${producerIndex + 1}. Producer</h5>
            <button type="button" class="remove-btn" onclick="removeProducer(${producerIndex})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-input producer-name" required>
            </div>
            <div class="form-group">
                <label>Surname</label>
                <input type="text" class="form-input producer-surname" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-input producer-email" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" class="form-input producer-phone" required>
            </div>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea class="form-textarea producer-address" rows="3" required></textarea>
        </div>
    `;
    
    producersContainer.appendChild(producerForm);
}

function removeProducer(index) {
    const producerForm = document.querySelector(`[data-producer="${index}"]`);
    if (producerForm) {
        producerForm.remove();
        formData.producers.splice(index, 1);
        
        // Update producer numbers
        const remainingForms = document.querySelectorAll('[data-producer]');
        remainingForms.forEach((form, newIndex) => {
            form.setAttribute('data-producer', newIndex);
            const header = form.querySelector('.person-header h5');
            if (header) {
                header.textContent = `${newIndex + 1}. Producer`;
            }
        });
    }
}

// Scriptwriter functions for International Competition
function addScriptwriterInternational() {
    const scriptwritersContainer = document.getElementById('scriptwriters-container');
    const scriptwriterIndex = formData.scriptwriters.length;
    
    formData.scriptwriters.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    });

    const scriptwriterForm = document.createElement('div');
    scriptwriterForm.className = 'person-form';
    scriptwriterForm.setAttribute('data-scriptwriter', scriptwriterIndex);
    scriptwriterForm.innerHTML = `
        <div class="person-header">
            <h5>${scriptwriterIndex + 1}. Scriptwriter</h5>
            <button type="button" class="remove-btn" onclick="removeScriptwriter(${scriptwriterIndex})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-input scriptwriter-name" required>
            </div>
            <div class="form-group">
                <label>Surname</label>
                <input type="text" class="form-input scriptwriter-surname" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-input scriptwriter-email" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" class="form-input scriptwriter-phone" required>
            </div>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea class="form-textarea scriptwriter-address" rows="3" required></textarea>
        </div>
    `;
    
    scriptwritersContainer.appendChild(scriptwriterForm);
}

function removeScriptwriter(index) {
    const scriptwriterForm = document.querySelector(`[data-scriptwriter="${index}"]`);
    if (scriptwriterForm) {
        scriptwriterForm.remove();
        formData.scriptwriters.splice(index, 1);
        
        // Update scriptwriter numbers
        const remainingForms = document.querySelectorAll('[data-scriptwriter]');
        remainingForms.forEach((form, newIndex) => {
            form.setAttribute('data-scriptwriter', newIndex);
            const header = form.querySelector('.person-header h5');
            if (header) {
                header.textContent = `${newIndex + 1}. Scriptwriter`;
            }
        });
    }
}

// Sponsor functions for International Competition
function addSponsorInternational() {
    const sponsorsContainer = document.getElementById('sponsors-container');
    const sponsorIndex = formData.sponsors.length;
    
    formData.sponsors.push({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const sponsorForm = document.createElement('div');
    sponsorForm.className = 'person-form';
    sponsorForm.setAttribute('data-sponsor', sponsorIndex);
    sponsorForm.innerHTML = `
        <div class="person-header">
            <h5>${sponsorIndex + 1}. Institution/Organization</h5>
            <button type="button" class="remove-btn" onclick="removeSponsor(${sponsorIndex})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Institution/Organization Name</label>
                <input type="text" class="form-input sponsor-name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-input sponsor-email" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" class="form-input sponsor-phone" required>
            </div>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea class="form-textarea sponsor-address" rows="3" required></textarea>
        </div>
    `;
    
    sponsorsContainer.appendChild(sponsorForm);
}

function removeSponsor(index) {
    const sponsorForm = document.querySelector(`[data-sponsor="${index}"]`);
    if (sponsorForm) {
        sponsorForm.remove();
        formData.sponsors.splice(index, 1);
        
        // Update sponsor numbers
        const remainingForms = document.querySelectorAll('[data-sponsor]');
        remainingForms.forEach((form, newIndex) => {
            form.setAttribute('data-sponsor', newIndex);
            const header = form.querySelector('.person-header h5');
            if (header) {
                header.textContent = `${newIndex + 1}. Institution/Organization`;
            }
        });
    }
}

// Sales Agent functions for International Competition
function addSalesAgentInternational() {
    const salesAgentsContainer = document.getElementById('salesagents-container');
    const salesAgentIndex = formData.salesAgents.length;
    
    formData.salesAgents.push({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    });

    const salesAgentForm = document.createElement('div');
    salesAgentForm.className = 'person-form';
    salesAgentForm.setAttribute('data-salesagent', salesAgentIndex);
    salesAgentForm.innerHTML = `
        <div class="person-header">
            <h5>${salesAgentIndex + 1}. Sales Agent</h5>
            <button type="button" class="remove-btn" onclick="removeSalesAgent(${salesAgentIndex})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-input salesagent-name" required>
            </div>
            <div class="form-group">
                <label>Surname</label>
                <input type="text" class="form-input salesagent-surname" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-input salesagent-email" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" class="form-input salesagent-phone" required>
            </div>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea class="form-textarea salesagent-address" rows="3" required></textarea>
        </div>
    `;
    
    salesAgentsContainer.appendChild(salesAgentForm);
}

function removeSalesAgent(index) {
    const salesAgentForm = document.querySelector(`[data-salesagent="${index}"]`);
    if (salesAgentForm) {
        salesAgentForm.remove();
        formData.salesAgents.splice(index, 1);
        
        // Update sales agent numbers
        const remainingForms = document.querySelectorAll('[data-salesagent]');
        remainingForms.forEach((form, newIndex) => {
            form.setAttribute('data-salesagent', newIndex);
            const header = form.querySelector('.person-header h5');
            if (header) {
                header.textContent = `${newIndex + 1}. Sales Agent`;
            }
        });
    }
}

// Crew functions for International Competition
function addCrewMemberInternational() {
    const crewContainer = document.getElementById('crew-container');
    const crewIndex = formData.crew.length;
    
    formData.crew.push({
        name: '',
        surname: '',
        role: '',
        email: '',
        phone: ''
    });

    const crewForm = document.createElement('div');
    crewForm.className = 'crew-form';
    crewForm.setAttribute('data-crew', crewIndex);
    crewForm.innerHTML = `
        <div class="crew-header">
            <h5>${crewIndex + 1}. Crew Member</h5>
            <button type="button" class="remove-btn" onclick="removeCrewMember(${crewIndex})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-input crew-name" required>
            </div>
            <div class="form-group">
                <label>Surname</label>
                <input type="text" class="form-input crew-surname" required>
            </div>
            <div class="form-group">
                <label>Role</label>
                <input type="text" class="form-input crew-role" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-input crew-email" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" class="form-input crew-phone" required>
            </div>
        </div>
    `;
    
    crewContainer.appendChild(crewForm);
}

function removeCrewMember(index) {
    const crewForm = document.querySelector(`[data-crew="${index}"]`);
    if (crewForm) {
        crewForm.remove();
        formData.crew.splice(index, 1);
        
        // Update crew member numbers
        const remainingForms = document.querySelectorAll('[data-crew]');
        remainingForms.forEach((form, newIndex) => {
            form.setAttribute('data-crew', newIndex);
            const header = form.querySelector('.crew-header h5');
            if (header) {
                header.textContent = `${newIndex + 1}. Crew Member`;
            }
        });
    }
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
            address: form.querySelector('.director-address')?.value || '',
            biography: form.querySelector('.director-biography')?.value || '',
            filmography: form.querySelector('.director-filmography')?.value || ''
        };
        formData.directors.push(director);
    });
    
    // Save producers data if international competition
    if (selectedCategory === 'international-competition') {
        const producerForms = document.querySelectorAll('[data-producer]');
        formData.producers = [];
        
        producerForms.forEach((form, index) => {
            const producer = {
                name: form.querySelector('.producer-name')?.value || '',
                surname: form.querySelector('.producer-surname')?.value || '',
                email: form.querySelector('.producer-email')?.value || '',
                phone: form.querySelector('.producer-phone')?.value || '',
                address: form.querySelector('.producer-address')?.value || ''
            };
            formData.producers.push(producer);
        });
        
        // Save scriptwriters data
        const scriptwriterForms = document.querySelectorAll('[data-scriptwriter]');
        formData.scriptwriters = [];
        
        scriptwriterForms.forEach((form, index) => {
            const scriptwriter = {
                name: form.querySelector('.scriptwriter-name')?.value || '',
                surname: form.querySelector('.scriptwriter-surname')?.value || '',
                email: form.querySelector('.scriptwriter-email')?.value || '',
                phone: form.querySelector('.scriptwriter-phone')?.value || '',
                address: form.querySelector('.scriptwriter-address')?.value || ''
            };
            formData.scriptwriters.push(scriptwriter);
        });
        
        // Save sponsors data
        const sponsorForms = document.querySelectorAll('[data-sponsor]');
        formData.sponsors = [];
        
        sponsorForms.forEach((form, index) => {
            const sponsor = {
                name: form.querySelector('.sponsor-name')?.value || '',
                email: form.querySelector('.sponsor-email')?.value || '',
                phone: form.querySelector('.sponsor-phone')?.value || '',
                address: form.querySelector('.sponsor-address')?.value || ''
            };
            formData.sponsors.push(sponsor);
        });
        
        // Save sales agents data
        const salesAgentForms = document.querySelectorAll('[data-salesagent]');
        formData.salesAgents = [];
        
        salesAgentForms.forEach((form, index) => {
            const salesAgent = {
                name: form.querySelector('.salesagent-name')?.value || '',
                surname: form.querySelector('.salesagent-surname')?.value || '',
                email: form.querySelector('.salesagent-email')?.value || '',
                phone: form.querySelector('.salesagent-phone')?.value || '',
                address: form.querySelector('.salesagent-address')?.value || ''
            };
            formData.salesAgents.push(salesAgent);
        });
        
        // Save crew data
        const crewForms = document.querySelectorAll('[data-crew]');
        formData.crew = [];
        
        crewForms.forEach((form, index) => {
            const crewMember = {
                name: form.querySelector('.crew-name')?.value || '',
                surname: form.querySelector('.crew-surname')?.value || '',
                role: form.querySelector('.crew-role')?.value || '',
                email: form.querySelector('.crew-email')?.value || '',
                phone: form.querySelector('.crew-phone')?.value || ''
            };
            formData.crew.push(crewMember);
        });
    }
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
    // Log form data for international competition
    if (selectedCategory === 'international-competition') {
        console.log('International Competition Application Data:', JSON.stringify(formData, null, 2));
        alert('Application submitted successfully! Check console for data.');
    }
    
    // Show success message
    if (stepContent) {
        stepContent.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>${selectedCategory === 'international-competition' ? 'Your Application Has Been Successfully Submitted!' : 'Başvurunuz Başarıyla Gönderildi!'}</h2>
                <p>${selectedCategory === 'international-competition' ? 'Application Number:' : 'Başvuru numaranız:'} <strong>TRT-${Date.now()}</strong></p>
                <div class="success-details">
                    <p>${selectedCategory === 'international-competition' ? 'Application Date:' : 'Başvuru Tarihi:'} ${new Date().toLocaleDateString(selectedCategory === 'international-competition' ? 'en-US' : 'tr-TR')}</p>
                    <p>${selectedCategory === 'international-competition' ? 'Category:' : 'Kategori:'} ${selectedCategory === 'international-competition' ? 'International Competition' : formData.category}</p>
                    <p>${selectedCategory === 'international-competition' ? 'Film:' : 'Film:'} ${formData.filmNameTurkish}</p>
                </div>
                <p>${selectedCategory === 'international-competition' ? 'Your application has been taken into evaluation. You will be informed about the results via your email address.' : 'Başvurunuz değerlendirmeye alınmıştır. Sonuçlar hakkında e-posta adresinize bilgilendirme yapılacaktır.'}</p>
                <button class="new-application-btn" onclick="location.reload()">${selectedCategory === 'international-competition' ? 'New Application' : 'Yeni Başvuru Yap'}</button>
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