<?php

// Cache klasörünü kontrol et ve yoksa oluştur
if (!file_exists('cache')) {
    if (!mkdir('cache', 0755, true)) {
        echo "<!-- Cache klasörü oluşturulamadı -->";
        exit; // Klasör oluşturulamadıysa işlemden çık
    }
}

// PHP hata raporlamasını etkinleştir
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// PHP'nin başına şu satırı ekleyin
echo "<!-- Bu sayfa PHP tarafından oluşturuldu: ".date('Y-m-d H:i:s')." -->";

// Önbellek dosyasının adı, URL'ye göre oluşturuluyor
$cachefile = 'cache/' . md5($_SERVER['REQUEST_URI']) . '.html';
// Önbellek süresi (saniye cinsinden)
$cachetime = 3600; // 1 saat (3600 saniye)

// Eğer önbellek dosyası mevcutsa ve süresi dolmamışsa, onu yükleyin
if (file_exists($cachefile) && time() - $cachetime < filemtime($cachefile)) {
    echo "<!-- Önbellekten yüklendi: $cachefile -->";
    readfile($cachefile); // Önbellek dosyasını göster
    exit; // İşlemi durdur
}

// Eğer önbellek yoksa, output buffering başlatın
ob_start();
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Cache Testi</title>
</head>
<body>

<h1>Merhaba Dünya!</h1>
<p>Bu sayfa PHP tarafından oluşturuldu ve önbelleğe alınacak.</p>

<!-- Bu bölümde dinamik veya sabit içeriklerinizi yerleştirebilirsiniz -->
<p>Sayfa oluşturulma zamanı: <?php echo date('Y-m-d H:i:s'); ?></p>

</body>
</html>

<?php
// Tampon içeriğini kontrol etmek için ekleyin
$buffer_content = ob_get_contents();
echo "<!-- Tampon içeriği uzunluğu: " . strlen($buffer_content) . " -->";

// Çıktıyı önbellek dosyasına yazın
$cached = fopen($cachefile, 'w');

// fopen başarısız olursa fwrite ve fclose çağrıları yapılmamalıdır
if ($cached) {
    fwrite($cached, $buffer_content);
    fclose($cached);
    echo "<!-- Önbellek dosyası oluşturuldu: $cachefile -->";
} else {
    // fopen başarısız olduysa bir hata mesajı gösterebilir veya loglayabilirsiniz
    echo "<!-- Önbellek dosyası oluşturulamadı -->";
}

// Çıktıyı tarayıcıya gönder
ob_end_flush();
?>
