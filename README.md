# Türkiye Deprem Api
Türkiye'de gerçekleşen son 500 deprem bilgisinin Kandilli Rasathanesi'nin internet sitesinden çekilerek oluşturulmuş rest api servisidir. Veriler json formatında çıktı olarak alınabilir ve üzerlerinde bütün filtreleme işlemleri uygulanabilir. <br/>

> **INTERNET SITESI :** https://turkiyedepremapi.herokuapp.com/

Filteleme özellikleri: başlangıç ve bitiş tarihi, başlangıç ve bitiş saati, enlem aralığı, boylam aralığı, derinlik, buyukluk ve şehir. <br/>

> **HIZLI KULLANIM :** https://turkiyedepremapi.herokuapp.com/api

## Api Kullanım
|   Api Adres      | Açıklama   | 
| ------------- |:-------------:|
| /api      | Türkiye'de gerçekleşen son 500 deprem bilgisini getirir. |
| /api?min=4.2&max=5.0      | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz mininum ve maximum büyüklüğe göre depremleri getirir.      | 
| /api?tarih=2020.01.26 | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz tarihte gerçekleşen depremleri getirir.      |
| /api?minsaat=16:48:00&maxsaat=17:55:00 | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz başlangıç ve bitiş saatlerine göre depremleri getirir      |
| /api?sehir=(BALIKESIR) | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz şehre göre depremleri getirir.      |
| /api?minderinlik=12.5&maxderinlik=15 | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz mininum ve maximum derinliğe göre depremleri getirir.      |
| /api?minenlem=36.14&maxenlem=38.68 | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz enlem aralığına göre depremleri getirir.      |
| /api?minboylam=36.14&boylam=38.68 | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz boylam aralığına göre depremleri getirir.      |
| /api?baslangic=2020.01.26&bitis=2020.01.27 | Türkiye'de gerçekleşen son 500 deprem bilgisini arasından istemiş olduğunuz iki tarih arasına göre depremleri getirir.      |

## Uygulama Görüntüsü
![Resim1](https://i.resimyukle.xyz/JGUOCb.png) <br/>

## Local Bilgisayarda Kurulum
1-) Depoyu Yerel Bilgisayarınıza İndirin. 
> **ADIM-1 :** git clone https://github.com/berkekurnaz/Turkiye-Deprem-Api

2-) Paket Bağımlılıklarını Kurun
> **ADIM-2 :** npm install

3-) Kurulum Başarıyla Tamamlandı
> **ADIM-3 :** npm start  --> Proje http://localhost:3000 portundan yayına başlar

## Veri Kaynağı
Veriler BOĞAZİÇİ ÜNİVERSİTESİ KANDİLLİ RASATHANESİ VE DEPREM ARAŞTIRMA ENSTİTÜSÜ internet sitesi üzerinden sağlanmaktadır. <br />
Verilerin Orijinal İnternet Sitesi Adresi İçin : http://www.koeri.boun.edu.tr/scripts/lst0.asp

## Geliştiriciler
Berke Kurnaz
<br/>
> **GITHUB :** https://github.com/berkekurnaz


## İletişim
contact@berkekurnaz.com