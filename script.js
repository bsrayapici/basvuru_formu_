// Satış Yetkilisi ekleme fonksiyonu - Düzeltilmiş versiyon
function addSalesAgent() {
    const container = document.getElementById('salesAgents-container'); // 'sales-agents-container' yerine 'salesAgents-container'
    if (!container) {
        console.error('salesAgents-container not found');
        return;
    }
    
    const index = formData.salesAgents.length;
    const isInternational = selectedCategory === 'international-competition';
    
    const salesAgentHtml = isInternational ? `
        <div class="person-form" id="sales-agent-${index}">
            <div class="person-header">
                <h5>Sales Agent ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeSalesAgent(${index})">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="sales-agent-name-${index}">Name <span class="required">*</span></label>
                    <input type="text" id="sales-agent-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="sales-agent-surname-${index}">Surname <span class="required">*</span></label>
                    <input type="text" id="sales-agent-surname-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="sales-agent-email-${index}">Email Address <span class="required">*</span></label>
                    <input type="email" id="sales-agent-email-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="sales-agent-phone-${index}">Phone <span class="required">*</span></label>
                    <input type="tel" id="sales-agent-phone-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-group">
                <label for="sales-agent-address-${index}">Address <span class="required">*</span></label>
                <textarea id="sales-agent-address-${index}" class="form-textarea" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="sales-agent-biography-${index}">Biography <span class="required">*</span></label>
                <textarea id="sales-agent-biography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="sales-agent-filmography-${index}">Filmography <span class="required">*</span></label>
                <textarea id="sales-agent-filmography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
        </div>
    ` : `
        <div class="person-form" id="sales-agent-${index}">
            <div class="person-header">
                <h5>Satış Yetkilisi ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeSalesAgent(${index})">Kaldır</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="sales-agent-name-${index}">Ad <span class="required">*</span></label>
                    <input type="text" id="sales-agent-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="sales-agent-surname-${index}">Soyad <span class="required">*</span></label>
                    <input type="text" id="sales-agent-surname-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="sales-agent-email-${index}">E-Posta Adresi <span class="required">*</span></label>
                    <input type="email" id="sales-agent-email-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="sales-agent-phone-${index}">Telefon <span class="required">*</span></label>
                    <input type="tel" id="sales-agent-phone-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-group">
                <label for="sales-agent-address-${index}">Adres <span class="required">*</span></label>
                <textarea id="sales-agent-address-${index}" class="form-textarea" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="sales-agent-biography-${index}">Özgeçmiş <span class="required">*</span></label>
                <textarea id="sales-agent-biography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="sales-agent-filmography-${index}">Filmografi <span class="required">*</span></label>
                <textarea id="sales-agent-filmography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', salesAgentHtml);
    formData.salesAgents.push({});
}

function removeSalesAgent(index) {
    const element = document.getElementById(`sales-agent-${index}`);
    if (element) {
        element.remove();
        formData.salesAgents.splice(index, 1);
    }
}

// Teknik Ekip ekleme fonksiyonu - Düzeltilmiş versiyon
function addTechnicalCrew() {
    const container = document.getElementById('crew-container'); // 'technical-crew-container' yerine 'crew-container'
    if (!container) {
        console.error('crew-container not found');
        return;
    }
    
    const index = formData.crew.length;
    const isInternational = selectedCategory === 'international-competition';
    
    const crewHtml = isInternational ? `
        <div class="crew-form" id="crew-${index}">
            <div class="crew-header">
                <h5>Technical Crew ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeTechnicalCrew(${index})">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="crew-name-${index}">Full Name <span class="required">*</span></label>
                    <input type="text" id="crew-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="crew-role-${index}">Role <span class="required">*</span></label>
                    <input type="text" id="crew-role-${index}" class="form-input" required>
                </div>
            </div>
        </div>
    ` : `
        <div class="crew-form" id="crew-${index}">
            <div class="crew-header">
                <h5>Teknik Ekip ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeTechnicalCrew(${index})">Kaldır</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="crew-name-${index}">Ad Soyad <span class="required">*</span></label>
                    <input type="text" id="crew-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="crew-role-${index}">Görevi <span class="required">*</span></label>
                    <input type="text" id="crew-role-${index}" class="form-input" required>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', crewHtml);
    formData.crew.push({});
}

function removeTechnicalCrew(index) {
    const element = document.getElementById(`crew-${index}`);
    if (element) {
        element.remove();
        formData.crew.splice(index, 1);
    }
}

// addCrew fonksiyonu da güncellensin
function addCrew() {
    return addTechnicalCrew(); // Teknik ekip ekleme fonksiyonuna yönlendir
}

// Diğer container ID'lerini de kontrol edelim
function addProducer() {
    const container = document.getElementById('producers-container');
    if (!container) {
        console.error('producers-container not found');
        return;
    }
    
    const index = formData.producers.length;
    const isInternational = selectedCategory === 'international-competition';
    
    const producerHtml = isInternational ? `
        <div class="person-form" id="producer-${index}">
            <div class="person-header">
                <h5>Producer ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeProducer(${index})">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="producer-name-${index}">Name <span class="required">*</span></label>
                    <input type="text" id="producer-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="producer-surname-${index}">Surname <span class="required">*</span></label>
                    <input type="text" id="producer-surname-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="producer-email-${index}">Email Address <span class="required">*</span></label>
                    <input type="email" id="producer-email-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="producer-phone-${index}">Phone <span class="required">*</span></label>
                    <input type="tel" id="producer-phone-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-group">
                <label for="producer-address-${index}">Address <span class="required">*</span></label>
                <textarea id="producer-address-${index}" class="form-textarea" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="producer-biography-${index}">Biography <span class="required">*</span></label>
                <textarea id="producer-biography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="producer-filmography-${index}">Filmography <span class="required">*</span></label>
                <textarea id="producer-filmography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
        </div>
    ` : `
        <div class="person-form" id="producer-${index}">
            <div class="person-header">
                <h5>Yapımcı ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeProducer(${index})">Kaldır</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="producer-name-${index}">Ad <span class="required">*</span></label>
                    <input type="text" id="producer-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="producer-surname-${index}">Soyad <span class="required">*</span></label>
                    <input type="text" id="producer-surname-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="producer-email-${index}">E-Posta Adresi <span class="required">*</span></label>
                    <input type="email" id="producer-email-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="producer-phone-${index}">Telefon <span class="required">*</span></label>
                    <input type="tel" id="producer-phone-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-group">
                <label for="producer-address-${index}">Adres <span class="required">*</span></label>
                <textarea id="producer-address-${index}" class="form-textarea" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="producer-biography-${index}">Özgeçmiş <span class="required">*</span></label>
                <textarea id="producer-biography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="producer-filmography-${index}">Filmografi <span class="required">*</span></label>
                <textarea id="producer-filmography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', producerHtml);
    formData.producers.push({});
}

function addScriptwriter() {
    const container = document.getElementById('scriptwriters-container');
    if (!container) {
        console.error('scriptwriters-container not found');
        return;
    }
    
    const index = formData.scriptwriters.length;
    const isInternational = selectedCategory === 'international-competition';
    
    const scriptwriterHtml = isInternational ? `
        <div class="person-form" id="scriptwriter-${index}">
            <div class="person-header">
                <h5>Scriptwriter ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeScriptwriter(${index})">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="scriptwriter-name-${index}">Name <span class="required">*</span></label>
                    <input type="text" id="scriptwriter-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="scriptwriter-surname-${index}">Surname <span class="required">*</span></label>
                    <input type="text" id="scriptwriter-surname-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="scriptwriter-email-${index}">Email Address <span class="required">*</span></label>
                    <input type="email" id="scriptwriter-email-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="scriptwriter-phone-${index}">Phone <span class="required">*</span></label>
                    <input type="tel" id="scriptwriter-phone-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-group">
                <label for="scriptwriter-address-${index}">Address <span class="required">*</span></label>
                <textarea id="scriptwriter-address-${index}" class="form-textarea" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="scriptwriter-biography-${index}">Biography <span class="required">*</span></label>
                <textarea id="scriptwriter-biography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="scriptwriter-filmography-${index}">Filmography <span class="required">*</span></label>
                <textarea id="scriptwriter-filmography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
        </div>
    ` : `
        <div class="person-form" id="scriptwriter-${index}">
            <div class="person-header">
                <h5>Metin Yazarı ${index + 1}</h5>
                <button type="button" class="remove-btn" onclick="removeScriptwriter(${index})">Kaldır</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="scriptwriter-name-${index}">Ad <span class="required">*</span></label>
                    <input type="text" id="scriptwriter-name-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="scriptwriter-surname-${index}">Soyad <span class="required">*</span></label>
                    <input type="text" id="scriptwriter-surname-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="scriptwriter-email-${index}">E-Posta Adresi <span class="required">*</span></label>
                    <input type="email" id="scriptwriter-email-${index}" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="scriptwriter-phone-${index}">Telefon <span class="required">*</span></label>
                    <input type="tel" id="scriptwriter-phone-${index}" class="form-input" required>
                </div>
            </div>
            <div class="form-group">
                <label for="scriptwriter-address-${index}">Adres <span class="required">*</span></label>
                <textarea id="scriptwriter-address-${index}" class="form-textarea" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="scriptwriter-biography-${index}">Özgeçmiş <span class="required">*</span></label>
                <textarea id="scriptwriter-biography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="scriptwriter-filmography-${index}">Filmografi <span class="required">*</span></label>
                <textarea id="scriptwriter-filmography-${index}" class="form-textarea" rows="4" required></textarea>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', scriptwriterHtml);
    formData.scriptwriters.push({});
}