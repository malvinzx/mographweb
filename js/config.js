// ===== PENGATURAN GAMPANG =====
window.CFG={
  delay:0,              // detik. + = lirik muncul lebih lambat, - = lebih cepat (ada juga tombol +/- di layar)
  end:202,              // durasi lagu (detik)
  audio:'audio/song.mp3',
  // [mulai(detik), warna gelap, warna terang, warna aksen, 1 = bara naik / 0 = salju turun]
  scenes:[
    [0,'#070b14','#16233b','#cfe3ff',0],      // malam sepi, lampu jalan
    [22,'#140d03','#3b2707','#ffc857',0],     // golden boy
    [39,'#150304','#52100c','#ff5a36',1],     // chorus: terbakar
    [65,'#070b14','#16233b','#cfe3ff',0],
    [82,'#140d03','#3b2707','#ffc857',0],
    [99.5,'#150304','#52100c','#ff5a36',1],
    [124.7,'#0d0716','#2b1250','#c9a7ff',0],  // carousel
    [142.2,'#150304','#52100c','#ff5a36',1],
    [170.3,'#030303','#141414','#ffffff',0]   // please don't call me
  ]
};
