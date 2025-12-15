
-- Insert missing items
-- Note: Price is set to 0, please update manually
  
INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'ТАНУКИ', 'https://kcdn.tanuki.ru/brands/1/_ifg1SifWU4uafA8BqGYzr3NbNkBfm_T.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'ТАНУКИ');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'TVOЯ Pizza', 'https://kcdn.tanuki.ru/brands/1/96762FnDYdK3wxnD52hv69CIhW9I_xIl.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'TVOЯ Pizza');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ёрш', 'https://kcdn.tanuki.ru/images/1/bjQtUMXyTQks6GGhg5v7S-XoRBwrwSkW.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ёрш');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'КАСПИЙКА', 'https://kcdn.tanuki.ru/brands/1/0T5sNrjJxml0_dkARPZBl3CJuVW2YxoT.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'КАСПИЙКА');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кейтеринг', 'https://kcdn.tanuki.ru/brands/1/xBOMp0NxvORhlAcjJ4zkHqccZDs5seEM.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кейтеринг');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'КАСПИЙКА Кейтеринг', 'https://kcdn.tanuki.ru/brands/1/I16rbOqE7Ittqy5uezKy_3zTMV8FDMY1.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'КАСПИЙКА Кейтеринг');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Всем выбрали подарки?', 'https://kcdn.tanuki.ru/bnr/1/2_KRfsoQoiJxT86-GlS6WyFYqxKqENMZ.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Всем выбрали подарки?');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Всем выбрали подарки? задний фон', 'https://kcdn.tanuki.ru/bnr/1/S3btEm-mWvX8qLWKQL_mgnpmqp6PDJUV.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Всем выбрали подарки? задний фон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Всем выбрали подарки? эмоджи', 'https://kcdn.tanuki.ru/bnr/1/9obEVXDrLncFXZS6Vx06i930KojpDe7K.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Всем выбрали подарки? эмоджи');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Вопросы со вкусом', 'https://kcdn.tanuki.ru/bnr/1/Ls5xEgO-b9E7j4MINIXaJNWf3pP7rSno.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Вопросы со вкусом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Вопросы со вкусом задний фон', 'https://kcdn.tanuki.ru/bnr/1/vN0c2LUgAFy4wgIW7Rbz50bOfbRWdZ3D.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Вопросы со вкусом задний фон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Вопросы со вкусом эмоджи', 'https://kcdn.tanuki.ru/bnr/1/-TKsOdttkxAB8dg9EohsVx_zNzlW26Qo.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Вопросы со вкусом эмоджи');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'По дороге с работы', 'https://kcdn.tanuki.ru/bnr/1/q7LWs8GY70hEYsCV7skpijF8b8Y1pIgE.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'По дороге с работы');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'По дороге с работы задний фон', 'https://kcdn.tanuki.ru/bnr/1/0aKIDor6un5_guZd4EMKmAOHI8M-7591.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'По дороге с работы задний фон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'По дороге с работы эмоджи', 'https://kcdn.tanuki.ru/bnr/1/nQrxCtLRuTcvrduwvd5qJMD39Hmc2v5w.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'По дороге с работы эмоджи');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Встречайте в Kidʼs box', 'https://kcdn.tanuki.ru/bnr/1/40_B9AgC5rrghkWzgliLeLNKG21Eix6L.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Встречайте в Kidʼs box');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Встречайте в Kidʼs box задний фон', 'https://kcdn.tanuki.ru/bnr/1/C5Ll3iBvn2OLsu_p3C8rwSLVjXYJwWju.png', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Встречайте в Kidʼs box задний фон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Встречайте в Kidʼs box эмоджи', 'https://kcdn.tanuki.ru/bnr/1/ExpvHzG7xcNqp-oZX_tOs7LWD1OIma9m.png', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Встречайте в Kidʼs box эмоджи');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Запеченный краб', 'https://kcdn.tanuki.ru/images/1/msaCi8qP3JDxDmihNxFmsXC-W6xcDW5r.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Запеченный краб');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Острое', 'https://kcdn.tanuki.ru/images/1/SwQgVo8eEcslZuM-QbnmH4N1VQuBXa4Y.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Острое');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Калифорния с лососем', 'https://kcdn.tanuki.ru/images/1/JMUpGK4cU50aT4jRMq1wYet0PMaOXaY0.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Калифорния с лососем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Филадельфия лайт', 'https://kcdn.tanuki.ru/images/1/kFR8ft9laT1a_7uO6ngzlYkkYME9CjXE.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Филадельфия лайт');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Окинава', 'https://kcdn.tanuki.ru/images/1/9p_zesruzTes9lqQxc73pHtJnbePDVzK.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Окинава');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Тайгер', 'https://kcdn.tanuki.ru/images/1/2PN91WjtqEn1lNtmfhPWi5FWJc-VdEXn.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Тайгер');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Креветка васаби', 'https://kcdn.tanuki.ru/images/1/du0TxQa7lI7yaxWdsEvIsHWeUT-caQAE.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Креветка васаби');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Эби блючиз', 'https://kcdn.tanuki.ru/images/1/J2J-jcDwxkQet1_eLiYOeg3PdB9fcslr.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Эби блючиз');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Теплый краб', 'https://kcdn.tanuki.ru/images/1/9Tkf6PdvLP4O4_Itvq4jujp0uaEYUkZS.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Теплый краб');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Амуро', 'https://kcdn.tanuki.ru/images/1/ffUor9blF6mjeCFwRdbPa8-LtxgLkb8X.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Амуро');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Мексиканский', 'https://kcdn.tanuki.ru/images/1/p20EthscreKOhAqJ8BFRvnY-zEtSJYlI.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Мексиканский');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Дракон', 'https://kcdn.tanuki.ru/images/1/GOQOD78qEFMKYRVpZZFtTZufekCDVLQ8.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Дракон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Карри шримп', 'https://kcdn.tanuki.ru/images/1/9jPXNRQV5PQC8xHsC36JeecDGj7yV4Fd.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Карри шримп');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Орандж микс', 'https://kcdn.tanuki.ru/images/1/7-48WuoOPvk2Uj8_GlOVblUAow0_zczp.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Орандж микс');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Тунец Нисуаз', 'https://kcdn.tanuki.ru/images/1/lQw7Gw6g-JYg9xduHJPvlX2TNgHrYoYS.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Тунец Нисуаз');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Чеддер', 'https://kcdn.tanuki.ru/images/1/wtVGUQXh8QSdJ5-iz_hzOU2rOc1NR8JK.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Чеддер');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Эби тамаго', 'https://kcdn.tanuki.ru/images/1/tpkf9eE03Pu724vZDSI_K-Rhug_WjAc5.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Эби тамаго');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Карамельный угорь', 'https://kcdn.tanuki.ru/images/1/3XX9nHRZrtGAFJdOim5JKODxgnB_LpXv.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Карамельный угорь');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Сифуд чиз', 'https://kcdn.tanuki.ru/images/1/G1eZi_w8YiwN9VAC66pcqLoRO2YJiZa3.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Сифуд чиз');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Хрустящий тунец', 'https://kcdn.tanuki.ru/images/1/N7iL-zKlurPyzegAhEluDqC03S_Srlsf.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Хрустящий тунец');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Мидори', 'https://kcdn.tanuki.ru/images/1/JtXtNpngeMpe-LCimkW76AQ4CW7BlEY0.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Мидори');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Даку', 'https://kcdn.tanuki.ru/images/1/hn_mmrj2lNlbokQOLFG_aQGl_Ryw-o86.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Даку');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Хотатэ авокадо', 'https://kcdn.tanuki.ru/images/1/8XuvWSxxJ0LRrJ-2qOrS6uL9dp7z3KT6.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Хотатэ авокадо');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Унаги торуфу', 'https://kcdn.tanuki.ru/images/1/VnVLcVornnHG0z20PLZxe5UK52f529c2.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Унаги торуфу');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Юмико', 'https://kcdn.tanuki.ru/images/1/2PH-g02tZ6lPTwujh-5wu6GqdDtDyUCF.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Юмико');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Маки с угрем', 'https://kcdn.tanuki.ru/images/1/vqURCQc5Eu4wGMC7zh0IvS7JbneFnYQQ.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Маки с угрем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Маки с тунцом', 'https://kcdn.tanuki.ru/images/1/WhE1uNXkdwRcFkUCbWebOidtaTTuMith.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Маки с тунцом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Маки с лососем', 'https://kcdn.tanuki.ru/images/1/_0-Py3AC1UOeyzelKlfZcNZvLj4E307z.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Маки с лососем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шоколадный ролл', 'https://kcdn.tanuki.ru/images/1/dOI518aAqpRpY-G6CnAwZVeNsA6tDIfG.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шоколадный ролл');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Kid&#39;s Box с куриным бургером (с игрушкой)', 'https://kcdn.tanuki.ru/images/1/hCGrLMK0tOlxBSmC1gg3WM4vkuu1INAi.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Kid&#39;s Box с куриным бургером (с игрушкой)');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Аригато', 'https://kcdn.tanuki.ru/images/1/HvFYn71nCgwMvj_gH6XOZFF7Q8OO9BBm.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Аригато');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Хиты', 'https://kcdn.tanuki.ru/images/1/LzMHzh4vNW8ycW6ncb956gFVekMxcG-u.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Хиты');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Калифорния', 'https://kcdn.tanuki.ru/images/1/szUvNCwGe8HdfueHCKZm1K4Ve1DnPQoy.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Калифорния');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Тануки', 'https://kcdn.tanuki.ru/images/1/bGKgANHokw3vlcQDkmCdtyvKZ2auVAkw.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Тануки');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Снегопад', 'https://kcdn.tanuki.ru/images/1/n1t9PDOlZbcfEKVaVOOTexPSgoQdzItz.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Снегопад');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Новинки', 'https://kcdn.tanuki.ru/images/1/3ozCwA6_NBH4rSzb2dYPlLF3OEZKoYO7.png', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Новинки');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Спринг-ролл с креветкой', 'https://kcdn.tanuki.ru/images/1/kpvl0c7AAffXsIidY8Zz_4PD16RmI1zB.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Спринг-ролл с креветкой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Мишура', 'https://kcdn.tanuki.ru/images/1/mmqiRc8CzuipKoig2wcOFlMZhGSVdcGc.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Мишура');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Когасэ', 'https://kcdn.tanuki.ru/images/1/LBCLiTX2Kulc2rgv99hdiFmmLYmYgtFh.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Когасэ');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Санта', 'https://kcdn.tanuki.ru/images/1/wsRBA8bpW1TIgxglTGh1rZjrhFNlc1va.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Санта');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Калифорния Хот', 'https://kcdn.tanuki.ru/images/1/E9XaBPPrKjELnoNWk1K5heDaEcioAv2t.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Калифорния Хот');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Спринг-ролл с курицей', 'https://kcdn.tanuki.ru/images/1/c7FUCU-IvNUT7QQ_yWFFjS1ziBk3jXxn.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Спринг-ролл с курицей');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Филадельфия', 'https://kcdn.tanuki.ru/images/1/6JaZ7OsE4-shYQ__isB6b9CxlADuJr85.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Филадельфия');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ролл Прайм', 'https://kcdn.tanuki.ru/images/1/3gSVvJmrHdkZbnx2wQ8fHOg2FtCzk5q9.jpg', 'Роллы', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ролл Прайм');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Онсен сет', 'https://kcdn.tanuki.ru/images/1/-RGTgQQ6EjpGIs2irEiPnIC_uVCP3qBN.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Онсен сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кавай сет', 'https://kcdn.tanuki.ru/images/1/OS5oPYtpegHj3PHXkMUhK6QEIuWtcVs_.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кавай сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Аригато сет', 'https://kcdn.tanuki.ru/images/1/rG13QuPi8s_01tQtTpAt4A8TdywuGMXf.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Аригато сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Фудзи сет', 'https://kcdn.tanuki.ru/images/1/D84C0MnGf-dzZmNsOzaRD3uhxlTHzWCt.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Фудзи сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ойши сет', 'https://kcdn.tanuki.ru/images/1/OUxnonWebmCfnyjNi0BATCxr2OwJ5EQz.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ойши сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Party De Luxe', 'https://kcdn.tanuki.ru/images/1/XBvpLkrGXiqkN8koM-0sVpIDMTo1xmvH.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Party De Luxe');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Маме с любовью', 'https://kcdn.tanuki.ru/images/1/PZOAMEwIzluyIt_gtQ0H_q1XZexV9qdb.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Маме с любовью');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тануки сет', 'https://kcdn.tanuki.ru/images/1/oTn-yN_ga3tBysPVm1XIDZBvLhUvt9CS.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тануки сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Мураками сет', 'https://kcdn.tanuki.ru/images/1/Fk_SzhTZ4d2JaJdvA4Apjx5zSPYpsCnp.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Мураками сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сумико сет', 'https://kcdn.tanuki.ru/images/1/sOgg-GtV8NYt8dUT4XDJDJdd3yjVrDiQ.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сумико сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Top.Mail.Ru', 'https://top-fwz1.mail.ru/counter', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Top.Mail.Ru');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Джингл сет', 'https://kcdn.tanuki.ru/images/1/fW4kDxL_T4i9qPYv1Ic-GKxXMzgF_rCc.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Джингл сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Гринч', 'https://kcdn.tanuki.ru/images/1/vZskv82H1HmllLbhYBqd8qeEH_wGCRRd.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Гринч');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Груша-конопля', 'https://kcdn.tanuki.ru/images/1/4xcEuZNvjQcMiEpi5keas7AumIGYLMes.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Груша-конопля');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Бабл-ти кокосовый дзен', 'https://kcdn.tanuki.ru/images/1/2KwVDhVVjIqFiOabLbB3fdOaVWalBnpz.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Бабл-ти кокосовый дзен');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тануки ям', 'https://kcdn.tanuki.ru/images/1/CuOfdSDeo8iTxIZNZSX3aCvhsn-UKj_R.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тануки ям');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Мидии чизу', 'https://kcdn.tanuki.ru/images/1/flYr3ZNEwf84JLcG0x7cKC5CeRoDiSFo.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Мидии чизу');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Мидии васаби', 'https://kcdn.tanuki.ru/images/1/V2oHYDpnV6VTfmeftQMkE8Uv-X8Tv3Dm.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Мидии васаби');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Морской дракон', 'https://kcdn.tanuki.ru/images/1/d4RWVirOy0Vdh_Rn17yhUnsxVs7q8raI.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Морской дракон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кумотори', 'https://kcdn.tanuki.ru/images/1/5qjY4Ioi_JR0P4ocuQPn7xpYMQtHIqrL.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кумотори');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Цезарь c креветками', 'https://kcdn.tanuki.ru/images/1/lSecUs8QdiKzNcjgYw_EH89h5Y931fRG.jpg', 'Салаты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Цезарь c креветками');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Курица по-тайски с рисом', 'https://kcdn.tanuki.ru/images/1/ErAUDHIXFeEyuwfkoo43MTj9hDLtRf0H.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Курица по-тайски с рисом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лимонад Мандарин-Юдзу', 'https://kcdn.tanuki.ru/images/1/TJ9Fvzmc0o_gmcSZm0jfD8c-GGypK9o0.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лимонад Мандарин-Юдзу');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лимонад Классический', 'https://kcdn.tanuki.ru/images/1/Rg8tfXzrJMafD2asMdZbwANFnZavFaFT.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лимонад Классический');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Маки с авокадо', 'https://kcdn.tanuki.ru/images/1/OfC8_Hek98LwwuBb0Lg6ME2ll0DeiE5U.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Маки с авокадо');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Маки с огурцом', 'https://kcdn.tanuki.ru/images/1/ooeixYuLqq23hVEPsV5KFwKz67Ns-HZ6.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Маки с огурцом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суши тамаго', 'https://kcdn.tanuki.ru/images/1/mk6fkkSrnyjVKtM5PpaiSFYjILdUL3lP.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суши тамаго');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суши опаленный лосось', 'https://kcdn.tanuki.ru/images/1/GjbqZ8VuY-lusXX1YkNNjxo-3p81a8pT.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суши опаленный лосось');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суши с лососем', 'https://kcdn.tanuki.ru/images/1/_FCmL5Q32DL0tdYBNy9dqkK5M2NQHcA1.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суши с лососем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суши с угрем', 'https://kcdn.tanuki.ru/images/1/UvWW1CebVPbxlS79uvAcCx9G84pbVphB.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суши с угрем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суши с креветкой', 'https://kcdn.tanuki.ru/images/1/vKc6927Dvdt7E1ife14Pleu9iQvJQXxU.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суши с креветкой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суши с тунцом', 'https://kcdn.tanuki.ru/images/1/hhI5xQqaLXNXh7FgHTmJdq0sEQfdT55m.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суши с тунцом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Чука', 'https://kcdn.tanuki.ru/images/1/LEXMeOYQslX1TK-zOVNfvoqFM3I1R54z.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Чука');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Тобико', 'https://kcdn.tanuki.ru/images/1/vRLuhqZCMKgYMmd-1uWJWlDtFOhK4RZa.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Тобико');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Угорь спайси', 'https://kcdn.tanuki.ru/images/1/-sWu0DS7LGgwNyzSwBkZVonqiAveMdvI.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Угорь спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Креветка спайси', 'https://kcdn.tanuki.ru/images/1/bz-TS0oNGr3rMlLDVfv4_b0ZPAJdsxZh.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Креветка спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Краб-микс спайси', 'https://kcdn.tanuki.ru/images/1/000HC9F5nEFObywwoPHuRnLgZouj4UvN.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Краб-микс спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Гребешок спайси', 'https://kcdn.tanuki.ru/images/1/0fBxf324BQCBa_yuMwTV4kTv69i067oY.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Гребешок спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Лосось спайси', 'https://kcdn.tanuki.ru/images/1/zhVrVg5XfdX_2R0avciqUjng1yhf-_zj.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Лосось спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гункан Тунец спайси', 'https://kcdn.tanuki.ru/images/1/wVvyJ1dL2Qe9vdNII6DWL3xem74St6yH.jpg', 'Суши', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гункан Тунец спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Темаки с лососем', 'https://kcdn.tanuki.ru/images/1/NYlAcFRWkK4C4wY5imVLmArojoLf7OGK.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Темаки с лососем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Темаки с угрем', 'https://kcdn.tanuki.ru/images/1/jmHs72r9-YjAuyPWYmRYOp3wvaDTm2Mh.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Темаки с угрем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Темаки с крабом', 'https://kcdn.tanuki.ru/images/1/vnzwt9acYLwYYju0WyGZ7tnrAg7Z4fRy.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Темаки с крабом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сашими лосось', 'https://kcdn.tanuki.ru/images/1/8_3vq-ltI5EfZU5h85Zlshou-Et3F8rl.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сашими лосось');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сашими угорь', 'https://kcdn.tanuki.ru/images/1/RyTFf0EcpmKSGc3YAk_jKOAR2Mete2ZO.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сашими угорь');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сашими тунец', 'https://kcdn.tanuki.ru/images/1/9nm7ufrKwa0PZFl5r_v1cl5J7SSQudeI.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сашими тунец');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сашими креветка', 'https://kcdn.tanuki.ru/images/1/Qyju-Re1pxpG4YN2lzgZ0aV9baIdjaxF.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сашими креветка');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сашими ассорти', 'https://kcdn.tanuki.ru/images/1/aelww7myLamferF0zO7ooa6j3hxe4qJl.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сашими ассорти');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Дим-самы с сочными овощами', 'https://kcdn.tanuki.ru/images/1/KiZCe93wJ9R1VBk2t_C5zt3vx_kzQNJE.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Дим-самы с сочными овощами');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Дим-самы с лососем и креветкой', 'https://kcdn.tanuki.ru/images/1/byUXds-oKPoJcLZ6dV7CkTl0LQ-ERStj.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Дим-самы с лососем и креветкой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Дим-самы с кальмаром и креветкой', 'https://kcdn.tanuki.ru/images/1/KTtxfQ1CyP4Q12261FCJ8e86H2B2boDY.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Дим-самы с кальмаром и креветкой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Дим-самы с крабом и креветкой', 'https://kcdn.tanuki.ru/images/1/E7Q-iBZvmsV1jMfYMPg_fKFRUPwTRwPs.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Дим-самы с крабом и креветкой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сифудо сет', 'https://kcdn.tanuki.ru/images/1/mJ9p-NTZgfex6QEZpEu08-GQAnPvrBIM.jpg', 'Сеты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сифудо сет');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Мисо суп', 'https://kcdn.tanuki.ru/images/1/wnup7T_VtVhkTA_7TFzOEShVP8mBTAlF.jpg', 'Супы', 'hot', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Мисо суп');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Бао', 'https://kcdn.tanuki.ru/images/1/TpPA4vm-x-GVBnl6Edob6hVZF4scXXW3.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Бао');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Битые огурцы', 'https://kcdn.tanuki.ru/images/1/uw3v3X3xp34RCG1vCinMcuOO1n06AeED.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Битые огурцы');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Брокколи стир фрай', 'https://kcdn.tanuki.ru/images/1/eYZXqoKHRCNtlE3qdCl5dKUkpjNJBfoB.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Брокколи стир фрай');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Эдамамэ солт', 'https://kcdn.tanuki.ru/images/1/1Ck7IFtrM6r8e-l-zo5wjQiwBlE7MJci.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Эдамамэ солт');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Эдамамэ чили', 'https://kcdn.tanuki.ru/images/1/1nD4Cccq0tP4ftka4lJGzFJkfW_m4Noi.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Эдамамэ чили');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Овощи Теппан', 'https://kcdn.tanuki.ru/images/1/B83gOA_yLKtjP5t100uDf-igm3YML-mG.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Овощи Теппан');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тяхан с овощами', 'https://kcdn.tanuki.ru/images/1/bucYnMeYvHeQN8aLl2LFe88ul1C6apt9.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тяхан с овощами');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чука с ореховым соусом', 'https://kcdn.tanuki.ru/images/1/XLSdmMsNLdJGWXO2sx6ilAZd2TFzmQ0J.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чука с ореховым соусом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Картофель фри', 'https://kcdn.tanuki.ru/images/1/63jlEfBwINM3pOoEue-6llTd0vBTwnT3.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Картофель фри');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Рис на пару', 'https://kcdn.tanuki.ru/images/1/M2TVAbOP-9JR4D7Yh9b576Fol-kO2JXg.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Рис на пару');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из грибов', 'https://kcdn.tanuki.ru/images/1/CBIfkPABXdXzBgz1tP6-uPbjZEqKbhMa.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из грибов');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из кукурузы', 'https://kcdn.tanuki.ru/images/1/hGAaZ1GpEenvI9obgZ13yoybT1Oj57Cq.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из кукурузы');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Спелый ананас', 'https://kcdn.tanuki.ru/images/1/LiswJGDvkpJ0DBX0fKWntw6Dnxt36GVD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Спелый ананас');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Поке с лососем', 'https://kcdn.tanuki.ru/images/1/bgKakSYXD5mYs1dby_xD2hZ9jEoxfr-W.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Поке с лососем');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Вонтоны по-сычуаньски', 'https://kcdn.tanuki.ru/images/1/71CSYxtNemGat1dk6vFJ_FR2zyCt-wjW.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Вонтоны по-сычуаньски');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Креветки васаби', 'https://kcdn.tanuki.ru/images/1/x_68H3PHgfc6tqW0xsWatljkTXUKk4AK.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Креветки васаби');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Креветочные чипсы', 'https://kcdn.tanuki.ru/images/1/anCL8P3zhrxWkwjnLVsHA7ciDeu9dxDJ.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Креветочные чипсы');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Креветки темпура', 'https://kcdn.tanuki.ru/images/1/rqm4As_0Pe4OelCih9a41pzHlTE13nzB.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Креветки темпура');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Креветки в хрустящем тесте', 'https://kcdn.tanuki.ru/images/1/ynLUoYnwl5rAJKtfaDwNm8BjqnqBE7hK.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Креветки в хрустящем тесте');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гедза с креветками', 'https://kcdn.tanuki.ru/images/1/70xPBP_R3voqEWgBe4_MUhOZkz8fj0Eg.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гедза с креветками');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гедза с курицей', 'https://kcdn.tanuki.ru/images/1/-77lDyMmAE8P8J3PCz4Y4oIyB_L1nMj5.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гедза с курицей');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Поке с креветками', 'https://kcdn.tanuki.ru/images/1/6PV9If1dyp11LuHB7_tQaibOPi_tWSZp.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Поке с креветками');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Куриные крылышки', 'https://kcdn.tanuki.ru/images/1/NRU-tAT1NGAaVX7YuA-_33tBtsJlqMvH.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Куриные крылышки');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Калифорния спринг', 'https://kcdn.tanuki.ru/images/1/ZSrX6-ojtjy92AZMQZC_40U6AGkQaJ56.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Калифорния спринг');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Дамплинги со свининой', 'https://kcdn.tanuki.ru/images/1/sp0g0-JiboQ-rSLOHvceWOuFzZKfVpXJ.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Дамплинги со свининой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кольца кальмара', 'https://kcdn.tanuki.ru/images/1/eP_aLwT67yn5DwcaoK9iuLG15icaQQ68.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кольца кальмара');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тайский', 'https://kcdn.tanuki.ru/images/1/1zyWT7Kdgi146cyk8zG5kGcnRzn7Gd_q.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тайский');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Баклажаны и томаты', 'https://kcdn.tanuki.ru/images/1/2wmXqsZUdL6cqlC7euHYeXgKqsbCeYCD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Баклажаны и томаты');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Зеленый океан', 'https://kcdn.tanuki.ru/images/1/3zUdzEZFCca-qO9Lv-LJcALpdub6GIca.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Зеленый океан');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Нисуаз', 'https://kcdn.tanuki.ru/images/1/OC_q8xhW2LMG11TEfT_TVpBBNdzT3oVM.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Нисуаз');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Цезарь с курицей', 'https://kcdn.tanuki.ru/images/1/51plDSsknKKuNMEm-ViC1Gum0G5FJoM4.jpg', 'Салаты', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Цезарь с курицей');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кимчи со свининой', 'https://kcdn.tanuki.ru/images/1/6fDAz5r7nMZflXYSuXOTATki65_sZ9Vg.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кимчи со свининой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лакса', 'https://kcdn.tanuki.ru/images/1/IUC8dXXsQFhTUCzoFhYiiKZeD9kDyjT8.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лакса');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сябу с курицей и овощами', 'https://kcdn.tanuki.ru/images/1/6R6tS0VA2j7E22x55E56oY2oHSWtzSPk.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сябу с курицей и овощами');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Рамен с креветками', 'https://kcdn.tanuki.ru/images/1/5PUQbYo-HV3f0ZUCXpuRcUcRXskpNFcK.jpg', 'Супы', 'hot', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Рамен с креветками');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Рамен с говядиной', 'https://kcdn.tanuki.ru/images/1/RQnoFm-QQSCWdPSgBdGCdnR45XlxWKth.jpg', 'Супы', 'hot', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Рамен с говядиной');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сырный рамен', 'https://kcdn.tanuki.ru/images/1/Ag5LGw1C8gUQsEcFrUN43rJsITHMIM6T.jpg', 'Супы', 'hot', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сырный рамен');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ребра барбекю с кукурузой', 'https://kcdn.tanuki.ru/images/1/JtRkkQrD0PdTt3n8vxU5zIyFCQ1U3QKg.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ребра барбекю с кукурузой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Стейк семги', 'https://kcdn.tanuki.ru/images/1/nVHFO35jc0JVSKZguKrenKAhVzhCzI6n.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Стейк семги');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кацу чиз', 'https://kcdn.tanuki.ru/images/1/-GIuMRMeEw7Tc-7moIZHf7TcEIONYVZu.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кацу чиз');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Утка по-пекински', 'https://kcdn.tanuki.ru/images/1/WzuXnHy1P64823V_gMve9UNTWrI8rMbP.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Утка по-пекински');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лапша пад тай', 'https://kcdn.tanuki.ru/images/1/eXVtsGrsrl2DHIyEk6w38Ayd0DxTD7dq.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лапша пад тай');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Курица в кисло-сладком соусе', 'https://kcdn.tanuki.ru/images/1/GG_tx11nvR4uZucaOb5Oqb_RZrn4ap5v.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Курица в кисло-сладком соусе');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Говядина умисай', 'https://kcdn.tanuki.ru/images/1/QMeMQZ-vxtjKOCVbxg-HWXFo1FqZ7GpH.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Говядина умисай');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Рис но-ми с креветками', 'https://kcdn.tanuki.ru/images/1/Wq0p-8igTThyX6lp440wP8JWtm93Srd0.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Рис но-ми с креветками');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Рис но-ми со свининой', 'https://kcdn.tanuki.ru/images/1/FPTXUHRHaKLX4IyL6IE0pFIss7ne9zkc.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Рис но-ми со свининой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гюдон', 'https://kcdn.tanuki.ru/images/1/LHGq-ZPnvjULVUVwLxHq_g_160J85oD2.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гюдон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тяхан с морепродуктами', 'https://kcdn.tanuki.ru/images/1/UmTM1KN4issLXxra_5XimRnFE_59Y5dD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тяхан с морепродуктами');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тяхан с говядиной', 'https://kcdn.tanuki.ru/images/1/BNWK3tsp9fsxv8Cmbv_9UZ5aAPA6hP3x.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тяхан с говядиной');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тяхан с курицей', 'https://kcdn.tanuki.ru/images/1/DhPWvlP4vGiBgZd5ZaN9ogjLKZfDluJA.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тяхан с курицей');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лапша с морепродуктами', 'https://kcdn.tanuki.ru/images/1/6f6gTluWUUrepA4L-lob4MC6reOC20cs.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лапша с морепродуктами');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лапша эби-ям', 'https://kcdn.tanuki.ru/images/1/Vl3-o6VsuBVTIaqa3URjdp9ABLUFxhq1.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лапша эби-ям');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лапша с курицей', 'https://kcdn.tanuki.ru/images/1/l7oaNkSTmXO9e6uaCSo_0v2_fZxviBrI.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лапша с курицей');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Гречневая лапша с говядиной', 'https://kcdn.tanuki.ru/images/1/pDEvLbRS2s3MRFy8HlcZ-ke-DypoH_0T.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Гречневая лапша с говядиной');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Японский мини-бургер', 'https://kcdn.tanuki.ru/images/1/FiVG9DrCP5fGvDxg4TIkDZPmKHbdnEnw.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Японский мини-бургер');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чикен спайси', 'https://kcdn.tanuki.ru/images/1/cTllLoa_4wHlyk3djBZ9BJqsJaAvjZ0N.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чикен спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Унаги райс', 'https://kcdn.tanuki.ru/images/1/y272hJ3SOXzKM1ahp-CxKnlOgTYXOLZe.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Унаги райс');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Якитори ассорти мясное', 'https://kcdn.tanuki.ru/images/1/ZVAVGAA9Lda-VmcCup4ITTDacKldgmho.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Якитори ассорти мясное');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Якитори ассорти морепродукты', 'https://kcdn.tanuki.ru/images/1/nSiKUfLRz1sV9W88wXo6lpG2DgtKcS1K.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Якитори ассорти морепродукты');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из лосося', 'https://kcdn.tanuki.ru/images/1/wK5_q-u7RK1avTeaNt7OHGmkwaSFgwmO.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из лосося');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из тунца', 'https://kcdn.tanuki.ru/images/1/Sg8yTdRBrD2IbUL_zc591T6Xfd2huECs.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из тунца');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из креветки', 'https://kcdn.tanuki.ru/images/1/K6WBWh4LT49Vu8APGnBRIf_kQ9il-LZ5.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из креветки');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из кальмара', 'https://kcdn.tanuki.ru/images/1/uonIbxVV2Gxp9dVvotLCvbXyP80s0tjq.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из кальмара');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из гребешка', 'https://kcdn.tanuki.ru/images/1/TEVWos8G6ySwzGZzTtM98mTz9U2C6Lva.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из гребешка');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из мидий в беконе', 'https://kcdn.tanuki.ru/images/1/l1Hz-ZBsmzZQn--qpa7790vwaETUgMnW.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из мидий в беконе');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из говядины', 'https://kcdn.tanuki.ru/images/1/EitIX0bv63AxNnQxhVVyOqwF34lFoRWQ.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из говядины');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из курицы', 'https://kcdn.tanuki.ru/images/1/qwTzuAHSZRLNILRXEcGpmnan30iU3_LM.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из курицы');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из куриных сердечек', 'https://kcdn.tanuki.ru/images/1/zZyS1m6g83Yp-3DHZGi1YE-uZooZEuxy.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из куриных сердечек');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Шашлычок из перепелиных яиц', 'https://kcdn.tanuki.ru/images/1/UgQsReU-3r1aRgn7_LhGLwu7sjENzWcK.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Шашлычок из перепелиных яиц');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кастелло с клубникой и мятой', 'https://kcdn.tanuki.ru/images/1/KUOasj7Ey4Fi-fyb-q7Tg4A3ojAiG71S.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кастелло с клубникой и мятой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Куро еру', 'https://kcdn.tanuki.ru/images/1/RJYuNQcDAgwXlo2tZxJBCiiSTVKgrZTu.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Куро еру');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Наполеон-сан', 'https://kcdn.tanuki.ru/images/1/HRzR2hlKFWpzqTL2esa-oG0KGcfVLfrD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Наполеон-сан');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Малиновый сметанник', 'https://kcdn.tanuki.ru/images/1/cjgFVJL0wwr51YDskcOs7xH_lRrq2AK0.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Малиновый сметанник');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Амаи миру', 'https://kcdn.tanuki.ru/images/1/iSRW-VUzEvutle8G719zDvGDzeqXEzmj.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Амаи миру');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Тирамису', 'https://kcdn.tanuki.ru/images/1/SdBLHCu2sQp1PZiY1Poo-ia9He4AareU.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Тирамису');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Ассорти', 'https://kcdn.tanuki.ru/images/1/Z1Ah4YeHaeIwEdD5L8AxGzmNVA36zSmD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Ассорти');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Зеленый чай', 'https://kcdn.tanuki.ru/images/1/qsVY2b-LjWgOhT3fLYvyPoVHrCk7NMPF.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Зеленый чай');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Нежная ваниль', 'https://kcdn.tanuki.ru/images/1/jmy8WlmpXuO4VtcH4OjzAYQLUZ8PbwDB.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Нежная ваниль');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Райский банан', 'https://kcdn.tanuki.ru/images/1/ggIn2fnvzxRg9IYThL4w-r2YthB1YfGn.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Райский банан');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Бабл-гам', 'https://kcdn.tanuki.ru/images/1/2XMUxm_ga6TnQ_JPkc2bemyAiGcve956.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Бабл-гам');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Кокос баунти', 'https://kcdn.tanuki.ru/images/1/EpxsHzYHyAIc-q-iTdAmNfsV8L4mttc8.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Кокос баунти');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Тропический манго', 'https://kcdn.tanuki.ru/images/1/FX60TLc8oB7-W9rw0YNFEo6hccxE39aT.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Тропический манго');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Красный апельсин', 'https://kcdn.tanuki.ru/images/1/OVykNuJgWz819Fq7FEo5ZIOQ32DrwXgb.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Красный апельсин');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'MoMochi Тройной шоколад', 'https://kcdn.tanuki.ru/images/1/OVS9mdgVQuapEUlQ_I9yZ2XdskBkl2gX.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'MoMochi Тройной шоколад');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Kid&#x27;s Box с наггетсами (с игрушкой)', 'https://kcdn.tanuki.ru/images/1/FWFAGotOV4RKshI-TR2W37ztjv-Ae4Pp.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Kid&#x27;s Box с наггетсами (с игрушкой)');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Kid&#x27;s Box с куриным бургером (с игрушкой)', 'https://kcdn.tanuki.ru/images/1/hCGrLMK0tOlxBSmC1gg3WM4vkuu1INAi.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Kid&#x27;s Box с куриным бургером (с игрушкой)');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Куриные наггетсы с картофельным пюре', 'https://kcdn.tanuki.ru/images/1/GSOpNh39EvEEEtrhVnxspKH36BQmxgyS.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Куриные наггетсы с картофельным пюре');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Овощная соломка с сырным соусом', 'https://kcdn.tanuki.ru/images/1/C2HvTokHiGpMHfQFNU9ouDFyXBAJtuYv.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Овощная соломка с сырным соусом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чуррос с клюквенным соусом', 'https://kcdn.tanuki.ru/images/1/eYX4EpdOVWu8ru7BobRkc5TC0i4fUCUo.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чуррос с клюквенным соусом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Пельмешки со сметаной', 'https://kcdn.tanuki.ru/images/1/XkOKHLqTcgQM6xKWnUshAElPS_nfN32G.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Пельмешки со сметаной');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Наггетсы', 'https://kcdn.tanuki.ru/images/1/e5nRg1vaXmTrsTUGSKVeahOdT2CuE3md.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Наггетсы');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суп с курочкой', 'https://kcdn.tanuki.ru/images/1/KwYfV-8acz8hgbImEKHLsOutmubAIYt6.jpg', 'Супы', 'hot', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суп с курочкой');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Суп с фрикадельками', 'https://kcdn.tanuki.ru/images/1/YExcVy0VcK-hYhiIPO9V-WOSGbiwckxT.jpg', 'Супы', 'hot', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Суп с фрикадельками');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Макароны с сыром', 'https://kcdn.tanuki.ru/images/1/QfSBulw8BNwsBVX3nwFJGsc45GPRiLGB.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Макароны с сыром');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Бургер с курицей и картошкой фри', 'https://kcdn.tanuki.ru/images/1/UZYChsY1-m7pIISvMEUEDLZH6jTqY_br.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Бургер с курицей и картошкой фри');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сырные палочки с клюквенным соусом', 'https://kcdn.tanuki.ru/images/1/aa6s4g1pYxEwalV5gwvhTtYvb8kwujfL.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сырные палочки с клюквенным соусом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Картошка фри', 'https://kcdn.tanuki.ru/images/1/bTMfcM1LLLFxh5IQGRv6_0IySjTk3wYS.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Картошка фри');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Панкейки с шоколадом', 'https://kcdn.tanuki.ru/images/1/M5uH2_dIEuwqdfbW2tSnySwN4eta0gWs.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Панкейки с шоколадом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Игра Memory', 'https://kcdn.tanuki.ru/images/1/G-6JHDzB4iCwt5r7dziKwHWP2rKHN_QP.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Игра Memory');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Имбирь', 'https://kcdn.tanuki.ru/images/1/Vfhz50bCdKigPtM0acTzMv7Xlnd6856k.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Имбирь');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Васаби', 'https://kcdn.tanuki.ru/images/1/YZrAnhCOXUM__kT47_HbnisPxvSwS2BD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Васаби');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соевый соус', 'https://kcdn.tanuki.ru/images/1/fVKMdJR_9JBOBHUSty8KwYuAYM2VxzJw.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соевый соус');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соус хойсин', 'https://kcdn.tanuki.ru/images/1/yslsrVImmLxsQQYa2DwGQO3tB6WCruKa.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соус хойсин');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соус тайский', 'https://kcdn.tanuki.ru/images/1/1PO1AHWfXFmgu1GIJ6JjCb6rtsJkIrja.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соус тайский');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соус спайси', 'https://kcdn.tanuki.ru/images/1/wYpGjkksP-m_ay6qt07KySO2KGC8P7gi.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соус спайси');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соус шогояки', 'https://kcdn.tanuki.ru/images/1/eWoDMss1sdWil29cGcJCoF22S4uLUxjE.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соус шогояки');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соус унаги', 'https://kcdn.tanuki.ru/images/1/F_jknSjvUMmuRtAXejDrGiIAeqxqKv8T.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соус унаги');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соус кохаку', 'https://kcdn.tanuki.ru/images/1/AlRbDVbC2lPHRT1TeShzVaG7Il-1bamD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соус кохаку');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Соус гамадари', 'https://kcdn.tanuki.ru/images/1/UkGdYUkS2HQYgmQ4zZ4gcIfNt-to6vxT.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Соус гамадари');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Кетчуп', 'https://kcdn.tanuki.ru/images/1/kzy2u3_K2C0Hgmz0mXOW9hKz5mOgYHLc.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Кетчуп');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Бабл-ти тайский кокос', 'https://kcdn.tanuki.ru/images/1/GNGipaClaxNj4pXxqm9zGS4zWU5Ok6AK.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Бабл-ти тайский кокос');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Бабл-ти ягодный', 'https://kcdn.tanuki.ru/images/1/7jPiON_y3uF48sr1SapPYbgh33YyrCyV.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Бабл-ти ягодный');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Бабл-ти черника с шоколадом', 'https://kcdn.tanuki.ru/images/1/so6qtaEMM4ozVza5KrHteKhTpN3N6-_B.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Бабл-ти черника с шоколадом');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Бабл-ти бамбук-дыня-личи', 'https://kcdn.tanuki.ru/images/1/jYNf8tJFR-2SwK11QTevR-DlL226zF1D.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Бабл-ти бамбук-дыня-личи');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Яблочный фреш', 'https://kcdn.tanuki.ru/images/1/lKmXW9q9pzatke2WfAnij76llp_wrpk5.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Яблочный фреш');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Апельсиновый фреш', 'https://kcdn.tanuki.ru/images/1/cuJS0YOjaVSjipKmBBVCPSzxdj1wuRrC.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Апельсиновый фреш');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ананасовый фреш', 'https://kcdn.tanuki.ru/images/1/qZzascFU1sukBmLpHFXxsOKlw_OU9iZR.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ананасовый фреш');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Грейпфрутовый фреш', 'https://kcdn.tanuki.ru/images/1/iiJmwXANj5Gj7nVzkhk6ACZ4Ul0GPyVh.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Грейпфрутовый фреш');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Морковный фреш', 'https://kcdn.tanuki.ru/images/1/34cVx3OrR-WlK0sXDBiRCNyLf3_ASPTD.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Морковный фреш');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Сельдереевый фреш', 'https://kcdn.tanuki.ru/images/1/Hk4SXAqP31zWYSsBOyXaeVwtA7bS6Qjd.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Сельдереевый фреш');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Яблоко-сельдерей', 'https://kcdn.tanuki.ru/images/1/4ryF0cAZh3GEIVZ4PuYN6n6ejbn6ruYm.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Яблоко-сельдерей');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Яблоко-сельдерей-морковь', 'https://kcdn.tanuki.ru/images/1/6uCA5CH6xyS6LScLNbSgCkNDgAwcbOCK.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Яблоко-сельдерей-морковь');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Морковь-сельдерей', 'https://kcdn.tanuki.ru/images/1/I0UxDaKkqPiumFKzASzQeINuP3hAqlpk.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Морковь-сельдерей');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лимонад Японская груша', 'https://kcdn.tanuki.ru/images/1/eRPce_3aElrZZEn4aij6YnyYynGdOWlP.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лимонад Японская груша');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лимонад Тархун-Тимьян', 'https://kcdn.tanuki.ru/images/1/geWsWPnBIJPGh1t6ETvgLizIsiurL_ZI.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лимонад Тархун-Тимьян');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лимонад Крем-сода', 'https://kcdn.tanuki.ru/images/1/9oZrL2Zr_ijG-Sh2BJ2m6XhaMEmTBt6N.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лимонад Крем-сода');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лимонад Гавайский бриз', 'https://kcdn.tanuki.ru/images/1/ZtH_33WbhnDualeiq-bzlY7KKCWmPvXV.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лимонад Гавайский бриз');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лимонад Гавайский бриз без сахара', 'https://kcdn.tanuki.ru/images/1/PepsJKFhMHq-n1WUPBKLC_J-p7H_bcco.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лимонад Гавайский бриз без сахара');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Холодный чай Жасмин-вишня', 'https://kcdn.tanuki.ru/images/1/E4NXf8JlikX9snJYSuE_3NDnHqGr206E.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Холодный чай Жасмин-вишня');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Морс клюквенный', 'https://kcdn.tanuki.ru/images/1/aO1ysy-cpfCgGR8Z3RiRU5elH5zha4_H.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Морс клюквенный');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Морс вишневый', 'https://kcdn.tanuki.ru/images/1/sVgBEHGE3xPDJCP7RHtDNDs7qpFB1pah.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Морс вишневый');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Глинтвейн вишня-манго (б/а)', 'https://kcdn.tanuki.ru/images/1/q4LXwKA3gGux--H1GDh2XzIVfotAFOHC.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Глинтвейн вишня-манго (б/а)');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Конопляный', 'https://kcdn.tanuki.ru/images/1/p5fXUO_lHLCYj_kLLtROAn5ies8fkSU7.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Конопляный');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Малина-манго', 'https://kcdn.tanuki.ru/images/1/s9kdXUTJotDxa8twyv8k6X0Wvo302GNc.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Малина-манго');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Манго-маракуйя без сахара', 'https://kcdn.tanuki.ru/images/1/WN6PLFayBgYdEr-Vk6hJD2gjE1MOMjuA.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Манго-маракуйя без сахара');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Облепиха-имбирь', 'https://kcdn.tanuki.ru/images/1/rCrdbXPYXVs92UqWbPejG6ik4GotMIPR.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Облепиха-имбирь');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Облепиха-мандарин', 'https://kcdn.tanuki.ru/images/1/Jj3rHVOWKCnhQIQCHgk_rbXi6HKklhoY.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Облепиха-мандарин');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Цитрусовый микс', 'https://kcdn.tanuki.ru/images/1/vcL-ke7rLWzoJ-mZIlWRNKNsTo3Dso7m.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Цитрусовый микс');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Чай Бора-Бора', 'https://kcdn.tanuki.ru/images/1/hOdBfiSlmmjkgHcyPSiDeU4ln1Lc2wq_.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Чай Бора-Бора');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Яблочный сок', 'https://kcdn.tanuki.ru/images/1/7D0HOcFgWRdIjn6AcpN5M8r1pWpFdIXR.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Яблочный сок');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Грейпфрутовый сок', 'https://kcdn.tanuki.ru/images/1/JbTV3U1wZRDutgHloG45SqCkEfqbH1XD.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Грейпфрутовый сок');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Яблочно-персиковый сок', 'https://kcdn.tanuki.ru/images/1/xZ7i_EOUsqTqRvPUyOEhrstVfCxWLQFK.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Яблочно-персиковый сок');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Ананасовый сок', 'https://kcdn.tanuki.ru/images/1/FAAHQPc4DDI7u_lj0-fKDQGPU2_kvHQu.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Ананасовый сок');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Апельсиновый сок', 'https://kcdn.tanuki.ru/images/1/ssSbwlRTH6HbXsnfTvZNjG13IFhKdvRb.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Апельсиновый сок');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Вишневый сок', 'https://kcdn.tanuki.ru/images/1/DfZCGsblDb_3sTIXZN9hZB2GZHkP25K8.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Вишневый сок');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Томатный сок', 'https://kcdn.tanuki.ru/images/1/9602KFdF8Zr6uBCfcSTORu0uac-k8m1X.jpg', 'Напитки', 'drinks', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Томатный сок');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Липтон лимон', 'https://kcdn.tanuki.ru/images/1/wHAIQIl8ZO2MXdPosQ-QlyLduWQpNZIn.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Липтон лимон');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Липтон зеленый', 'https://kcdn.tanuki.ru/images/1/3LX36kJiUR1wrRTuzYATvRWaQJarEy_E.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Липтон зеленый');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Evervess Cola', 'https://kcdn.tanuki.ru/images/1/DD3mimi3aOvJD_Sj-IFymRk4jRT4UD4d.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Evervess Cola');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Evervess Cola Zero', 'https://kcdn.tanuki.ru/images/1/b1pnQ0Ed28Vqql8abCV_sh_fu9G1vj6q.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Evervess Cola Zero');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Фрустайл Лимон-лайм', 'https://kcdn.tanuki.ru/images/1/wrrT5qtBNVt81YhIrhT9vA-AU6JbpU8z.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Фрустайл Лимон-лайм');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Фрустайл Апельсин', 'https://kcdn.tanuki.ru/images/1/JtaA9089rrQmzsIXJzRB4fSuSWljIDny.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Фрустайл Апельсин');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Аква Минерале (без газа)', 'https://kcdn.tanuki.ru/images/1/AsESAq0Ej0tD-eo6M1BMxA45NZIjhwwa.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Аква Минерале (без газа)');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Аква Минерале (с газом)', 'https://kcdn.tanuki.ru/images/1/7VtgUefwSPByeOSHMXmQOQUSQJsmsmq6.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Аква Минерале (с газом)');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Stella Artois non-alcoholic', 'https://kcdn.tanuki.ru/images/1/3azPGyM69Mx-6IA8JeE_P1qw5Mr22oXC.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Stella Artois non-alcoholic');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Лед', 'https://kcdn.tanuki.ru/images/1/Pp3SioM07nQIe52ASBEF4WpOhYAkXpoy.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Лед');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Свитшот «Ностальгия»', 'https://kcdn.tanuki.ru/images/1/ipRT7R-viSBccarTImdY8-2MOpGXUd5G.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Свитшот «Ностальгия»');

INSERT INTO public.menu_items (title, image_url, category, station, price)
SELECT 'Свитшот «Всем привет»', 'https://kcdn.tanuki.ru/images/1/wzasumYVze4Tl4Jnh1AHmtSZgaJcqP3j.jpg', 'Основное', 'cold', 0
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Свитшот «Всем привет»');
