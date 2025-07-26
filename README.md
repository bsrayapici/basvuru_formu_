# TRT Başvuru Formu

Bu proje, TRT (Türkiye Radyo ve Televizyon Kurumu) Başvuru Yönergeleri için geliştirilmiş modern bir web uygulamasıdır. Kullanıcıların farklı kategorilerde başvuru yapabilmelerini sağlayan kapsamlı bir form sistemidir.

## 🎯 Proje Özeti

TRT Başvuru Formu, belgesel yarışmaları ve proje destek başvuruları için tasarlanmış, kullanıcı dostu ve responsive bir web uygulamasıdır. Modern web teknolojileri kullanılarak geliştirilmiş olup, herhangi bir framework bağımlılığı bulunmamaktadır.

## ✨ Özellikler

### 🏆 Kategori Desteği
- **Profesyonel | Ulusal Belgesel Ödülleri Yarışması**
- **Öğrenci | Ulusal Belgesel Ödülleri Yarışması** (Öğrenci belgesi yükleme özelliği ile)
- **International Competition** (İngilizce form desteği)
- **Proje Destek Yarışması**

### 📋 Form Özellikleri
- ✅ **4 Adımlı Başvuru Süreci**
  1. Eser Linki ve Bilgileri
  2. Eser Sahibi Bilgileri
  3. Katılım Sözleşmesi
  4. Başvuru Özeti ve Onay

- ✅ **Dinamik Form Alanları**
  - Kategori bazlı form içeriği
  - Çoklu yönetmen ekleme
  - Teknik ekip bilgileri
  - Opsiyonel bölümler (Festival, Ödül, Sosyal Medya, IMDB)

- ✅ **Dosya Yükleme Sistemi**
  - Öğrenci belgesi yükleme (PDF, max 10MB)
  - Drag & drop desteği
  - Dosya validasyonu

### 🌐 Çok Dilli Destek
- **Türkçe**: Yerel kategoriler için
- **İngilizce**: International Competition için

### 📱 Responsive Tasarım
- Mobile-first yaklaşım
- Tablet ve desktop uyumluluğu
- Modern CSS Grid ve Flexbox kullanımı

### ⚡ Performans ve UX
- Vanilla JavaScript (framework yok)
- Hızlı yükleme süreleri
- Smooth animasyonlar ve geçişler
- Form validasyonu ve hata yönetimi
- Progress indicator

## 🛠️ Teknolojiler

### Frontend
- **HTML5**: Semantic markup, accessibility
- **CSS3**: Modern styling, animations, responsive design
- **Vanilla JavaScript**: ES6+, DOM manipulation, form handling

### Özellikler
- **Responsive Design**: Mobile-first approach
- **Form Validation**: Real-time validation
- **File Upload**: Drag & drop, file type/size validation
- **Multi-step Form**: Progress tracking
- **Dynamic Content**: Category-based form rendering

## 📁 Dosya Yapısı

```
trt-basvuru-formu/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri ve responsive tasarım
├── script.js           # JavaScript fonksiyonları
├── package.json        # Proje yapılandırması
├── download.html       # ZIP indirme sayfası
└── README.md          # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### 1. Dosyaları İndirin
```bash
# ZIP olarak indirin veya
git clone [repository-url]
cd trt-basvuru-formu
```

### 2. Web Sunucusu Başlatın
```bash
# Python ile
python -m http.server 8000

# Node.js ile (http-server gerekli)
npm install -g http-server
http-server

# PHP ile
php -S localhost:8000

# Live Server (VS Code extension)
# Sağ tık > "Open with Live Server"
```

### 3. Tarayıcıda Açın
```
http://localhost:8000
```

## 📋 Kullanım Kılavuzu

### 1. Kategori Seçimi
- Ana sayfada istediğiniz kategoriyi seçin
- "Başvuruya Başla" butonuna tıklayın

### 2. Form Doldurma
- **Adım 1**: Film bilgilerini girin
- **Adım 2**: Yönetmen ve ekip bilgilerini ekleyin
- **Adım 3**: Sözleşmeyi okuyup onaylayın
- **Adım 4**: Bilgileri kontrol edip başvuruyu tamamlayın

### 3. Özel Özellikler
- **Öğrenci Kategorisi**: Öğrenci belgesi yükleme zorunlu
- **International**: Form alanları İngilizce
- **Çoklu Yönetmen**: Birden fazla yönetmen eklenebilir

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Primary**: #ff6b35 (Turuncu)
- **Secondary**: #2c3e50 (Koyu Mavi)
- **Success**: #28a745 (Yeşil)
- **Warning**: #ffc107 (Sarı)
- **Danger**: #dc3545 (Kırmızı)

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Responsive**: Mobil ve desktop için optimize edilmiş

### UI Components
- Modern form elementleri
- Hover efektleri
- Loading states
- Error handling
- Success messages

## 🔧 Geliştirici Notları

### JavaScript Fonksiyonları
- `updateStepContent()`: Adım içeriğini günceller
- `addDirector()`: Yönetmen formu ekler
- `validateStep()`: Form validasyonu
- `handleFileUpload()`: Dosya yükleme işlemi
- `submitApplication()`: Başvuru gönderimi

### CSS Sınıfları
- `.form-step`: Form adımları
- `.category-option`: Kategori seçenekleri
- `.file-upload-area`: Dosya yükleme alanı
- `.validation-alert`: Hata mesajları

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📊 Browser Desteği

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için:
- GitHub Issues kullanın
- Pull Request gönderin

## 🔄 Versiyon Geçmişi

### v1.0.0 (Mevcut)
- ✅ 4 kategori desteği
- ✅ Çok adımlı form sistemi
- ✅ Dosya yükleme özelliği
- ✅ Responsive tasarım
- ✅ Form validasyonu
- ✅ Çok dilli destek (TR/EN)

---

**Not**: Bu proje modern web standartları kullanılarak geliştirilmiş olup, production ortamında kullanıma hazırdır.