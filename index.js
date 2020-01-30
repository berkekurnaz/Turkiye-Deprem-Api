var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var ejs = require('ejs');

const request = require("request");
const cheerio = require("cheerio");

class Deprem {
    constructor(tarih, saat, enlem, boylam, derinlik, buyukluk, yer, sehir) {
        this.tarih = tarih;
        this.saat = saat;
        this.enlem = enlem;
        this.boylam = boylam;
        this.derinlik = derinlik;
        this.buyukluk = buyukluk;
        this.yer = yer;
        this.sehir = sehir;
    }
}

app.engine('.ejs', ejs.__express);
app.set('views', __dirname + '/views/');

async function getirDepremler() {
    var depremler = [];
    request("http://www.koeri.boun.edu.tr/scripts/lst0.asp", (error, response, html) => {
        if (!error && response.statusCode == 200) {

            const $ = cheerio.load(html);

            /* Burada Toplu Olarak Html'den Gelen Veri Geldi */
            const response = $("pre").text();

            /* Gelen Verileri Satır Satır Ayırma Ve İlk Baştaki 6 Satırı Silme İşlemi */
            var result = response.split("\n");
            result = result.splice(6, result.length + 1);

            /* Her Bir Satiri Dolasma Islemi */
            result.forEach(element => {
                var depremString = element.split(" ");
                var depremBilgi = [];
                for (var i = 0; i < depremString.length; i++) {
                    if (depremString[i].length > 0) {
                        depremBilgi.push(depremString[i]);
                    }
                }

                var tarih = depremBilgi[0];
                var saat = depremBilgi[1];
                var enlem = depremBilgi[2];
                var boylam = depremBilgi[3];
                var derinlik = depremBilgi[4];
                var buyukluk = depremBilgi[6];
                var yer = depremBilgi[8];
                var sehir = depremBilgi[9];

                var deprem = new Deprem(tarih, saat, enlem, boylam, derinlik, buyukluk, yer, sehir);
                depremler.push(deprem);
            });

            console.log("Deprem Tarama Islemi Tamamlandi. Deprem Sayisi : " + depremler.length);
        }
    });
    return depremler;
}

// 10 saniyede 1 islem yapma
// setInterval(getirDepremler, 10000);

app.get("/", function (req, res) {
    res.render("index.ejs");
});

/* Api Sayfasi */
app.get('/api', function (req, res) {
    var depremler = [];
    request("http://www.koeri.boun.edu.tr/scripts/lst0.asp", (error, response, html) => {
        if (!error && response.statusCode == 200) {

            const $ = cheerio.load(html);

            /* Burada Toplu Olarak Html'den Gelen Veri Geldi */
            const response = $("pre").text();

            /* Gelen Verileri Satır Satır Ayırma Ve İlk Baştaki 6 Satırı Silme İşlemi */
            var result = response.split("\n");
            result = result.splice(6, result.length + 1);
            result = result.splice(0,result.length - 2);

            /* Her Bir Satiri Dolasma Islemi */
            result.forEach(element => {
                var depremString = element.split(" ");
                var depremBilgi = [];
                for (var i = 0; i < depremString.length; i++) {
                    if (depremString[i].length > 0) {
                        depremBilgi.push(depremString[i]);
                    }
                }

                var tarih = depremBilgi[0];
                var saat = depremBilgi[1];
                var enlem = depremBilgi[2];
                var boylam = depremBilgi[3];
                var derinlik = depremBilgi[4];
                var buyukluk = depremBilgi[6];
                var yer = depremBilgi[8];
                var sehir = depremBilgi[9];
                if(sehir != null){
                    if(depremBilgi[9].includes("(")){
                        sehir = depremBilgi[9];
                    }else{
                        sehir = "";
                    }
                }else{
                    sehir = "";
                }

                var deprem = new Deprem(tarih, saat, enlem, boylam, derinlik, buyukluk, yer, sehir);
                depremler.push(deprem);
            });

            console.log("Deprem Tarama Islemi Tamamlandi. Deprem Sayisi : " + depremler.length);

            /* TARIHE GORE FILTRELEME */
            if (req.query.tarih != null) {
                depremler = depremler.filter(x => x.tarih == req.query.tarih);
            }

            /* BASLANGIC TARIHINE GORE FILTRELEME */
            if (req.query.baslangic != null) {
                var baslangicTarih = new Date(req.query.baslangic);
                depremler = depremler.filter(x => new Date(x.tarih) >= baslangicTarih);
            }
            /* BITIS TARIHINE GORE FILTRELEME */
            if (req.query.bitis != null) {
                var bitisTarih = new Date(req.query.bitis);
                depremler = depremler.filter(x => new Date(x.tarih) <= bitisTarih);
            }

            /* SAATE GORE FILTRELEME */
            if (req.query.minsaat != null) {
                depremler = depremler.filter(x => x.saat >= req.query.minsaat);
            }
            if (req.query.maxsaat != null) {
                depremler = depremler.filter(x => x.saat <= req.query.maxsaat);
            }

            /* SEHIRE GORE FILTRELEME */
            if (req.query.sehir != null) {
                depremler = depremler.filter(x => x.sehir == req.query.sehir);
            }

            /* ENLEME GORE FILTRELEME */
            if (req.query.minenlem != null) {
                depremler = depremler.filter(x => x.enlem >= req.query.minenlem);
            }
            if (req.query.maxenlem != null) {
                depremler = depremler.filter(x => x.enlem <= req.query.maxenlem);
            }

            /* BOYLAMA GORE FILTRELEME */
            if (req.query.minboylam != null) {
                depremler = depremler.filter(x => x.boylam >= req.query.minboylam);
            }
            if (req.query.maxboylam != null) {
                depremler = depremler.filter(x => x.boylam <= req.query.maxboylam);
            }

            /* DERINLIGE GORE FILTRELEME */
            if (req.query.minderinlik != null) {
                depremler = depremler.filter(x => parseFloat(x.derinlik) >= parseFloat(req.query.minderinlik));
            }
            if (req.query.maxderinlik != null) {
                depremler = depremler.filter(x => parseFloat(x.derinlik) <= parseFloat(req.query.maxderinlik));
            }
            
            /* MIN DEGERE GORE FILTRELEME */
            if (req.query.min != null) {
                depremler = depremler.filter(x => parseFloat(x.buyukluk) >= parseFloat(req.query.min));
            }
            /* MAX DEGERE GORE FILTRELEME */
            if (req.query.max != null) {
                depremler = depremler.filter(x => parseFloat(x.buyukluk) <= parseFloat(req.query.max));
            }


            res.json(depremler);
        }
    });
});

io.on('connection', function (socket) {
    console.log('User connected');
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, function () {
    console.log('The app is running...');
});