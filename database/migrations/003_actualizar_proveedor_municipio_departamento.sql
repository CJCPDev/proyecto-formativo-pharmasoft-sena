-- ============================================================
--  SCRIPT DE MIGRACIÓN - PHARMASOFT
--  Propósito: Sincronizar departamento, municipio y proveedores
--  con la versión correcta del proyecto.
--
--   INSTRUCCIONES ANTES DE EJECUTAR:
--      1. Hacer un BACKUP de la base de datos actual.
--      2. Ejecutar este script completo de una sola vez.
--      3. No interrumpir la ejecución a mitad del proceso.
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- ============================================================
-- PASO 1: ELIMINAR TABLAS EN ORDEN INVERSO DE DEPENDENCIAS
-- Se eliminan solo las tres tablas que serán reemplazadas.
-- Las demás tablas (usuarios, roles, medicamentos, etc.) 
-- NO se tocan.
-- ============================================================

DROP TABLE IF EXISTS `proveedores`;
DROP TABLE IF EXISTS `municipio`;
DROP TABLE IF EXISTS `departamento`;

-- ============================================================
-- PASO 2: RECREAR `departamento` (versión correcta)
-- Sin la columna id_municipio que causaba referencia circular.
-- ============================================================

CREATE TABLE `departamento` (
  `id_departamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_departamento` varchar(50) NOT NULL,
  PRIMARY KEY (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================================
-- PASO 3: INSERTAR LOS 32 DEPARTAMENTOS DE COLOMBIA
-- ============================================================

INSERT INTO `departamento` (`id_departamento`, `nombre_departamento`) VALUES
(1,  'Amazonas'),
(2,  'Antioquia'),
(3,  'Arauca'),
(4,  'Atlántico'),
(5,  'Bolívar'),
(6,  'Boyacá'),
(7,  'Caldas'),
(8,  'Caquetá'),
(9,  'Casanare'),
(10, 'Cauca'),
(11, 'Cesar'),
(12, 'Chocó'),
(13, 'Córdoba'),
(14, 'Cundinamarca'),
(15, 'Guainía'),
(16, 'Guaviare'),
(17, 'Huila'),
(18, 'La Guajira'),
(19, 'Magdalena'),
(20, 'Meta'),
(21, 'Nariño'),
(22, 'Norte de Santander'),
(23, 'Putumayo'),
(24, 'Quindío'),
(25, 'Risaralda'),
(26, 'San Andrés y Providencia'),
(27, 'Santander'),
(28, 'Sucre'),
(29, 'Tolima'),
(30, 'Valle del Cauca'),
(31, 'Vaupés'),
(32, 'Vichada');

ALTER TABLE `departamento`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

-- ============================================================
-- PASO 4: RECREAR `municipio` (versión correcta)
-- Con la columna id_departamento y FK hacia departamento.
-- ============================================================

CREATE TABLE `municipio` (
  `id_municipio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_municipio` varchar(50) NOT NULL,
  `id_departamento` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_municipio`),
  KEY `fk_municipio_departamento` (`id_departamento`),
  CONSTRAINT `fk_municipio_departamento` FOREIGN KEY (`id_departamento`)
    REFERENCES `departamento` (`id_departamento`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================================
-- PASO 5: INSERTAR LOS 1.117 MUNICIPIOS DE COLOMBIA
-- ============================================================

INSERT INTO `municipio` (`id_municipio`, `nombre_municipio`, `id_departamento`) VALUES
(1,'Leticia',1),(2,'El Encanto',1),(3,'La Chorrera',1),(4,'La Pedrera',1),
(5,'La Victoria',1),(6,'Mirití-Paraná',1),(7,'Puerto Alegría',1),(8,'Puerto Arica',1),
(9,'Puerto Nariño',1),(10,'Puerto Santander',1),(11,'Tarapacá',1),
(12,'Medellín',2),(13,'Abejorral',2),(14,'Abriaquí',2),(15,'Alejandría',2),
(16,'Amagá',2),(17,'Amalfi',2),(18,'Andes',2),(19,'Angelópolis',2),
(20,'Angostura',2),(21,'Anorí',2),(22,'Anzá',2),(23,'Apartadó',2),
(24,'Arboletes',2),(25,'Argelia',2),(26,'Armenia',2),(27,'Barbosa',2),
(28,'Bello',2),(29,'Belmira',2),(30,'Betania',2),(31,'Betulia',2),
(32,'Briceño',2),(33,'Buriticá',2),(34,'Cáceres',2),(35,'Caicedo',2),
(36,'Caldas',2),(37,'Campamento',2),(38,'Cañasgordas',2),(39,'Caracolí',2),
(40,'Caramanta',2),(41,'Carepa',2),(42,'Carolina del Príncipe',2),(43,'Caucasia',2),
(44,'Chigorodó',2),(45,'Cisneros',2),(46,'Ciudad Bolívar',2),(47,'Cocorná',2),
(48,'Concepción',2),(49,'Concordia',2),(50,'Copacabana',2),(51,'Dabeiba',2),
(52,'Don Matías',2),(53,'Ebéjico',2),(54,'El Bagre',2),(55,'El Carmen de Viboral',2),
(56,'El Santuario',2),(57,'Entrerríos',2),(58,'Envigado',2),(59,'Fredonia',2),
(60,'Frontino',2),(61,'Giraldo',2),(62,'Girardota',2),(63,'Gómez Plata',2),
(64,'Granada',2),(65,'Guadalupe',2),(66,'Guarne',2),(67,'Guatapé',2),
(68,'Heliconia',2),(69,'Hispania',2),(70,'Itagüí',2),(71,'Ituango',2),
(72,'Jardín',2),(73,'Jericó',2),(74,'La Ceja',2),(75,'La Estrella',2),
(76,'La Pintada',2),(77,'La Unión',2),(78,'Liborina',2),(79,'Maceo',2),
(80,'Marinilla',2),(81,'Montebello',2),(82,'Murindó',2),(83,'Mutatá',2),
(84,'Nariño',2),(85,'Nechí',2),(86,'Necoclí',2),(87,'Olaya',2),
(88,'Peñol',2),(89,'Peque',2),(90,'Pueblorrico',2),(91,'Puerto Berrío',2),
(92,'Puerto Nare',2),(93,'Puerto Triunfo',2),(94,'Remedios',2),(95,'Retiro',2),
(96,'Rionegro',2),(97,'Sabanalarga',2),(98,'Sabaneta',2),(99,'Salgar',2),
(100,'San Andrés de Cuerquia',2),(101,'San Carlos',2),(102,'San Francisco',2),
(103,'San Jerónimo',2),(104,'San José de la Montaña',2),(105,'San Juan de Urabá',2),
(106,'San Luis',2),(107,'San Pedro de los Milagros',2),(108,'San Pedro de Urabá',2),
(109,'San Rafael',2),(110,'San Roque',2),(111,'San Vicente Ferrer',2),
(112,'Santa Bárbara',2),(113,'Santa Fe de Antioquia',2),(114,'Santa Rosa de Osos',2),
(115,'Santo Domingo',2),(116,'Segovia',2),(117,'Sonsón',2),(118,'Sopetrán',2),
(119,'Tarazá',2),(120,'Tarso',2),(121,'Titiribí',2),(122,'Toledo',2),
(123,'Turbo',2),(124,'Uramita',2),(125,'Urrao',2),(126,'Valdivia',2),
(127,'Valparaíso',2),(128,'Vegachí',2),(129,'Venecia',2),(130,'Vigía del Fuerte',2),
(131,'Yalí',2),(132,'Yarumal',2),(133,'Yolombó',2),(134,'Yondó',2),(135,'Zaragoza',2),
(136,'Arauca',3),(137,'Arauquita',3),(138,'Cravo Norte',3),(139,'Fortul',3),
(140,'Puerto Rondón',3),(141,'Saravena',3),(142,'Tame',3),
(143,'Barranquilla',4),(144,'Baranoa',4),(145,'Campo de la Cruz',4),(146,'Candelaria',4),
(147,'Galapa',4),(148,'Juan de Acosta',4),(149,'Luruaco',4),(150,'Malambo',4),
(151,'Manatí',4),(152,'Palmar de Varela',4),(153,'Piojó',4),(154,'Polonuevo',4),
(155,'Ponedera',4),(156,'Puerto Colombia',4),(157,'Repelón',4),(158,'Sabanagrande',4),
(159,'Sabanalarga',4),(160,'Santa Lucía',4),(161,'Santo Tomás',4),(162,'Soledad',4),
(163,'Suán',4),(164,'Tubará',4),(165,'Usiacurí',4),
(166,'Cartagena',5),(167,'Achí',5),(168,'Altos del Rosario',5),(169,'Arenal',5),
(170,'Arjona',5),(171,'Arroyohondo',5),(172,'Barranco de Loba',5),(173,'Calamar',5),
(174,'Cantagallo',5),(175,'Cicuco',5),(176,'Clemencia',5),(177,'El Carmen de Bolívar',5),
(178,'El Guamo',5),(179,'El Peñón',5),(180,'Hatillo de Loba',5),(181,'Magangué',5),
(182,'Mahates',5),(183,'Margarita',5),(184,'María la Baja',5),(185,'Mompós',5),
(186,'Montecristo',5),(187,'Morales',5),(188,'Norosí',5),(189,'Pinillos',5),
(190,'Regidor',5),(191,'Río Viejo',5),(192,'San Cristóbal',5),(193,'San Estanislao',5),
(194,'San Fernando',5),(195,'San Jacinto',5),(196,'San Jacinto del Cauca',5),
(197,'San Juan Nepomuceno',5),(198,'San Martín de Loba',5),(199,'San Pablo',5),
(200,'Santa Catalina',5),(201,'Santa Rosa',5),(202,'Santa Rosa del Sur',5),
(203,'Simití',5),(204,'Soplaviento',5),(205,'Talaigua Nuevo',5),(206,'Tiquisio',5),
(207,'Turbaco',5),(208,'Turbaná',5),(209,'Villanueva',5),(210,'Zambrano',5),
(211,'Tunja',6),(212,'Almeida',6),(213,'Aquitania',6),(214,'Arcabuco',6),
(215,'Belén',6),(216,'Berbeo',6),(217,'Betéitiva',6),(218,'Boavita',6),
(219,'Boyacá',6),(220,'Briceño',6),(221,'Buenavista',6),(222,'Busbanzá',6),
(223,'Caldas',6),(224,'Campohermoso',6),(225,'Cerinza',6),(226,'Chinavita',6),
(227,'Chiquinquirá',6),(228,'Chíquiza',6),(229,'Chiscas',6),(230,'Chita',6),
(231,'Chitaraque',6),(232,'Chivatá',6),(233,'Ciénega',6),(234,'Cómbita',6),
(235,'Coper',6),(236,'Corrales',6),(237,'Covarachía',6),(238,'Cubará',6),
(239,'Cucaita',6),(240,'Cuítiva',6),(241,'Duitama',6),(242,'El Cocuy',6),
(243,'El Espino',6),(244,'Firavitoba',6),(245,'Floresta',6),(246,'Gachantivá',6),
(247,'Gámeza',6),(248,'Garagoa',6),(249,'Guacamayas',6),(250,'Guateque',6),
(251,'Guayatá',6),(252,'Güicán',6),(253,'Iza',6),(254,'Jenesano',6),
(255,'Jericó',6),(256,'La Capilla',6),(257,'La Uvita',6),(258,'La Victoria',6),
(259,'Labranzagrande',6),(260,'Macanal',6),(261,'Maripí',6),(262,'Miraflores',6),
(263,'Mongua',6),(264,'Monguí',6),(265,'Moniquirá',6),(266,'Motavita',6),
(267,'Muzo',6),(268,'Nobsa',6),(269,'Nuevo Colón',6),(270,'Oicatá',6),
(271,'Otanche',6),(272,'Pachavita',6),(273,'Páez',6),(274,'Paipa',6),
(275,'Pajarito',6),(276,'Panqueba',6),(277,'Pauna',6),(278,'Paya',6),
(279,'Paz de Río',6),(280,'Pesca',6),(281,'Pisba',6),(282,'Puerto Boyacá',6),
(283,'Quípama',6),(284,'Ramiriquí',6),(285,'Ráquira',6),(286,'Rondón',6),
(287,'Saboyá',6),(288,'Sáchica',6),(289,'Samacá',6),(290,'San Eduardo',6),
(291,'San José de Pare',6),(292,'San Luis de Gaceno',6),(293,'San Mateo',6),
(294,'San Miguel de Sema',6),(295,'San Pablo de Borbur',6),(296,'Santa María',6),
(297,'Santa Rosa de Viterbo',6),(298,'Santa Sofía',6),(299,'Santana',6),
(300,'Sativanorte',6),(301,'Sativasur',6),(302,'Siachoque',6),(303,'Soatá',6),
(304,'Socotá',6),(305,'Socha',6),(306,'Sogamoso',6),(307,'Somondoco',6),
(308,'Sora',6),(309,'Soracá',6),(310,'Sotaquirá',6),(311,'Susacón',6),
(312,'Sutamarchán',6),(313,'Sutatenza',6),(314,'Tasco',6),(315,'Tenza',6),
(316,'Tibaná',6),(317,'Tibasosa',6),(318,'Tinjacá',6),(319,'Tipacoque',6),
(320,'Toca',6),(321,'Togüí',6),(322,'Tópaga',6),(323,'Tota',6),
(324,'Turmequé',6),(325,'Tuta',6),(326,'Tutazá',6),(327,'Úmbita',6),
(328,'Ventaquemada',6),(329,'Villa de Leyva',6),(330,'Viracachá',6),(331,'Zetaquira',6),
(332,'Manizales',7),(333,'Aguadas',7),(334,'Anserma',7),(335,'Aranzazu',7),
(336,'Belalcázar',7),(337,'Chinchiná',7),(338,'Filadelfia',7),(339,'La Dorada',7),
(340,'La Merced',7),(341,'Manzanares',7),(342,'Marmato',7),(343,'Marquetalia',7),
(344,'Marulanda',7),(345,'Neira',7),(346,'Norcasia',7),(347,'Pácora',7),
(348,'Palestina',7),(349,'Pensilvania',7),(350,'Riosucio',7),(351,'Risaralda',7),
(352,'Salamina',7),(353,'Samaná',7),(354,'San José',7),(355,'Supía',7),
(356,'Victoria',7),(357,'Villamaría',7),(358,'Viterbo',7),
(359,'Florencia',8),(360,'Albania',8),(361,'Belén de los Andaquíes',8),
(362,'Cartagena del Chairá',8),(363,'Curillo',8),(364,'El Doncello',8),
(365,'El Paujíl',8),(366,'La Montañita',8),(367,'Milán',8),(368,'Morelia',8),
(369,'Puerto Rico',8),(370,'San José del Fragua',8),(371,'San Vicente del Caguán',8),
(372,'Solano',8),(373,'Solita',8),(374,'Valparaíso',8),
(375,'Yopal',9),(376,'Aguazul',9),(377,'Chámeza',9),(378,'Hato Corozal',9),
(379,'La Salina',9),(380,'Maní',9),(381,'Monterrey',9),(382,'Nunchía',9),
(383,'Orocué',9),(384,'Paz de Ariporo',9),(385,'Pore',9),(386,'Recetor',9),
(387,'Sabanalarga',9),(388,'Sácama',9),(389,'San Luis de Palenque',9),
(390,'Támara',9),(391,'Tauramena',9),(392,'Trinidad',9),(393,'Villanueva',9),
(394,'Popayán',10),(395,'Almaguer',10),(396,'Argelia',10),(397,'Balboa',10),
(398,'Bolívar',10),(399,'Buenos Aires',10),(400,'Cajibío',10),(401,'Caldono',10),
(402,'Caloto',10),(403,'Corinto',10),(404,'El Tambo',10),(405,'Florencia',10),
(406,'Guachené',10),(407,'Guapi',10),(408,'Inzá',10),(409,'Jambaló',10),
(410,'La Sierra',10),(411,'La Vega',10),(412,'López de Micay',10),
(413,'Mercaderes',10),(414,'Miranda',10),(415,'Morales',10),(416,'Padilla',10),
(417,'Páez',10),(418,'Patía',10),(419,'Piamonte',10),(420,'Piendamó',10),
(421,'Puerto Tejada',10),(422,'Puracé',10),(423,'Rosas',10),(424,'San Sebastián',10),
(425,'Santa Rosa',10),(426,'Santander de Quilichao',10),(427,'Silvia',10),
(428,'Sotara',10),(429,'Suárez',10),(430,'Sucre',10),(431,'Timbío',10),
(432,'Timbiquí',10),(433,'Toribío',10),(434,'Totoró',10),(435,'Villa Rica',10),
(436,'Valledupar',11),(437,'Aguachica',11),(438,'Agustín Codazzi',11),
(439,'Astrea',11),(440,'Becerril',11),(441,'Bosconia',11),(442,'Chimichagua',11),
(443,'Chiriguaná',11),(444,'Curumaní',11),(445,'El Copey',11),(446,'El Paso',11),
(447,'Gamarra',11),(448,'González',11),(449,'La Gloria',11),
(450,'La Jagua de Ibirico',11),(451,'La Paz',11),(452,'Manaure Balcón del Cesar',11),
(453,'Pailitas',11),(454,'Pelaya',11),(455,'Pueblo Bello',11),(456,'Río de Oro',11),
(457,'San Alberto',11),(458,'San Diego',11),(459,'San Martín',11),
(460,'Tamalameque',11),
(461,'Quibdó',12),(462,'Acandí',12),(463,'Alto Baudó',12),(464,'Atrato',12),
(465,'Bagadó',12),(466,'Bahía Solano',12),(467,'Bajo Baudó',12),(468,'Bojayá',12),
(469,'Carmen del Darién',12),(470,'Cértegui',12),(471,'Condoto',12),
(472,'El Carmen de Atrato',12),(473,'El Litoral del San Juan',12),(474,'Istmina',12),
(475,'Juradó',12),(476,'Lloró',12),(477,'Medio Atrato',12),(478,'Medio Baudó',12),
(479,'Medio San Juan',12),(480,'Nóvita',12),(481,'Nuquí',12),(482,'Río Iro',12),
(483,'Río Quito',12),(484,'Riosucio',12),(485,'San José del Palmar',12),
(486,'Sipí',12),(487,'Tadó',12),(488,'Unguía',12),(489,'Unión Panamericana',12),
(490,'Montería',13),(491,'Ayapel',13),(492,'Buenavista',13),(493,'Canalete',13),
(494,'Cereté',13),(495,'Chimá',13),(496,'Chinú',13),(497,'Ciénaga de Oro',13),
(498,'Cotorra',13),(499,'La Apartada',13),(500,'Lorica',13),(501,'Los Córdobas',13),
(502,'Momil',13),(503,'Montelíbano',13),(504,'Moñitos',13),(505,'Planeta Rica',13),
(506,'Pueblo Nuevo',13),(507,'Puerto Escondido',13),(508,'Puerto Libertador',13),
(509,'Purísima',13),(510,'Sahagún',13),(511,'San Andrés de Sotavento',13),
(512,'San Antero',13),(513,'San Bernardo del Viento',13),(514,'San Carlos',13),
(515,'San José de Uré',13),(516,'San Pelayo',13),(517,'Tierralta',13),
(518,'Tuchín',13),(519,'Valencia',13),
(520,'Bogotá D.C.',14),(521,'Agua de Dios',14),(522,'Albán',14),(523,'Anapoima',14),
(524,'Anolaima',14),(525,'Apulo',14),(526,'Arbeláez',14),(527,'Beltrán',14),
(528,'Bituima',14),(529,'Bojacá',14),(530,'Cabrera',14),(531,'Cachipay',14),
(532,'Cajicá',14),(533,'Caparrapí',14),(534,'Cáqueza',14),(535,'Carmen de Carupa',14),
(536,'Chaguaní',14),(537,'Chía',14),(538,'Chipaque',14),(539,'Choachí',14),
(540,'Chocontá',14),(541,'Cogua',14),(542,'Cota',14),(543,'Cucunubá',14),
(544,'El Colegio',14),(545,'El Peñón',14),(546,'El Rosal',14),(547,'Facatativá',14),
(548,'Fomeque',14),(549,'Fosca',14),(550,'Funza',14),(551,'Fúquene',14),
(552,'Fusagasugá',14),(553,'Gachalá',14),(554,'Gachancipá',14),(555,'Gachetá',14),
(556,'Gama',14),(557,'Girardot',14),(558,'Granada',14),(559,'Guachetá',14),
(560,'Guaduas',14),(561,'Guasca',14),(562,'Guataquí',14),(563,'Guatavita',14),
(564,'Guayabal de Síquima',14),(565,'Guayabetal',14),(566,'Gutiérrez',14),
(567,'Jerusalén',14),(568,'Junín',14),(569,'La Calera',14),(570,'La Mesa',14),
(571,'La Palma',14),(572,'La Peña',14),(573,'La Vega',14),(574,'Lenguazaque',14),
(575,'Machetá',14),(576,'Madrid',14),(577,'Manta',14),(578,'Medina',14),
(579,'Mosquera',14),(580,'Nariño',14),(581,'Nemocón',14),(582,'Nilo',14),
(583,'Nimaima',14),(584,'Nocaima',14),(585,'Pacho',14),(586,'Paime',14),
(587,'Pandi',14),(588,'Paratebueno',14),(589,'Pasca',14),(590,'Puerto Salgar',14),
(591,'Pulí',14),(592,'Quebradanegra',14),(593,'Quetame',14),(594,'Quipile',14),
(595,'Ricaurte',14),(596,'San Antonio del Tequendama',14),(597,'San Bernardo',14),
(598,'San Cayetano',14),(599,'San Francisco',14),(600,'San Juan de Rioseco',14),
(601,'Sasaima',14),(602,'Sesquilé',14),(603,'Sibaté',14),(604,'Silvania',14),
(605,'Simijaca',14),(606,'Soacha',14),(607,'Sopó',14),(608,'Subachoque',14),
(609,'Suesca',14),(610,'Supatá',14),(611,'Susa',14),(612,'Sutatausa',14),
(613,'Tabio',14),(614,'Tausa',14),(615,'Tena',14),(616,'Tenjo',14),
(617,'Tibacuy',14),(618,'Tibiritá',14),(619,'Tocaima',14),(620,'Tocancipá',14),
(621,'Topaipí',14),(622,'Ubalá',14),(623,'Ubaque',14),(624,'Ubaté',14),
(625,'Une',14),(626,'Útica',14),(627,'Vergara',14),(628,'Vianí',14),
(629,'Villagómez',14),(630,'Villapinzón',14),(631,'Villeta',14),(632,'Viotá',14),
(633,'Yacopí',14),(634,'Zipacón',14),(635,'Zipaquirá',14),
(636,'Inírida',15),(637,'Barranco Minas',15),(638,'Cacahual',15),
(639,'La Guadalupe',15),(640,'Mapiripana',15),(641,'Morichal',15),
(642,'Pana Pana',15),(643,'Puerto Colombia',15),(644,'San Felipe',15),
(645,'San José del Guaviare',16),(646,'Calamar',16),(647,'El Retorno',16),
(648,'Miraflores',16),
(649,'Riohacha',17),(650,'Albania',17),(651,'Barrancas',17),(652,'Dibulla',17),
(653,'Distracción',17),(654,'El Molino',17),(655,'Fonseca',17),(656,'Hatonuevo',17),
(657,'La Jagua del Pilar',17),(658,'Maicao',17),(659,'Manaure',17),
(660,'San Juan del Cesar',17),(661,'Uribia',17),(662,'Urumita',17),(663,'Villanueva',17),
(664,'Neiva',18),(665,'Acevedo',18),(666,'Agrado',18),(667,'Aipe',18),
(668,'Algeciras',18),(669,'Altamira',18),(670,'Baraya',18),(671,'Campoalegre',18),
(672,'Colombia',18),(673,'Elías',18),(674,'Garzón',18),(675,'Gigante',18),
(676,'Guadalupe',18),(677,'Hobo',18),(678,'Iquira',18),(679,'Isnos',18),
(680,'La Argentina',18),(681,'La Plata',18),(682,'Nátaga',18),(683,'Oporapa',18),
(684,'Paicol',18),(685,'Palermo',18),(686,'Palestina',18),(687,'Pital',18),
(688,'Pitalito',18),(689,'Rivera',18),(690,'Saladoblanco',18),(691,'San Agustín',18),
(692,'Santa María',18),(693,'Suaza',18),(694,'Tarqui',18),(695,'Tello',18),
(696,'Teruel',18),(697,'Tesalia',18),(698,'Timaná',18),(699,'Villavieja',18),
(700,'Yaguará',18),
(701,'Santa Marta',19),(702,'Algarrobo',19),(703,'Aracataca',19),(704,'Ariguaní',19),
(705,'Cerro de San Antonio',19),(706,'Chivolo',19),(707,'Ciénaga',19),
(708,'Concordia',19),(709,'El Banco',19),(710,'El Piñón',19),(711,'El Retén',19),
(712,'Fundación',19),(713,'Guamal',19),(714,'Nueva Granada',19),(715,'Pedraza',19),
(716,'Pijiño del Carmen',19),(717,'Pivijay',19),(718,'Plato',19),
(719,'Puebloviejo',19),(720,'Remolino',19),(721,'Sabanas de San Ángel',19),
(722,'Salamina',19),(723,'San Sebastián de Buenavista',19),(724,'San Zenón',19),
(725,'Santa Ana',19),(726,'Santa Bárbara de Pinto',19),(727,'Sitionuevo',19),
(728,'Tenerife',19),(729,'Zapayán',19),(730,'Zona Bananera',19),
(731,'Villavicencio',20),(732,'Acacías',20),(733,'Barranca de Upía',20),
(734,'Cabuyaro',20),(735,'Castilla la Nueva',20),(736,'Cubarral',20),
(737,'Cumaral',20),(738,'El Calvario',20),(739,'El Castillo',20),(740,'El Dorado',20),
(741,'Fuente de Oro',20),(742,'Granada',20),(743,'Guamal',20),(744,'La Macarena',20),
(745,'La Uribe',20),(746,'Lejanías',20),(747,'Mapiripán',20),(748,'Mesetas',20),
(749,'Puerto Concordia',20),(750,'Puerto Gaitán',20),(751,'Puerto Lleras',20),
(752,'Puerto López',20),(753,'Puerto Rico',20),(754,'Restrepo',20),
(755,'San Carlos de Guaroa',20),(756,'San Juan de Arama',20),(757,'San Juanito',20),
(758,'San Martín',20),(759,'Vistahermosa',20),
(760,'Pasto',21),(761,'Albán',21),(762,'Aldana',21),(763,'Ancuyá',21),
(764,'Arboleda',21),(765,'Barbacoas',21),(766,'Belén',21),(767,'Buesaco',21),
(768,'Chachagüí',21),(769,'Colón',21),(770,'Consacá',21),(771,'Contadero',21),
(772,'Córdoba',21),(773,'Cuaspud',21),(774,'Cumbal',21),(775,'Cumbitara',21),
(776,'El Charco',21),(777,'El Peñol',21),(778,'El Rosario',21),
(779,'El Tablón de Gómez',21),(780,'El Tambo',21),(781,'Francisco Pizarro',21),
(782,'Funes',21),(783,'Guachucal',21),(784,'Guaitarilla',21),(785,'Gualmatán',21),
(786,'Iles',21),(787,'Imués',21),(788,'Ipiales',21),(789,'La Cruz',21),
(790,'La Florida',21),(791,'La Llanada',21),(792,'La Tola',21),(793,'La Unión',21),
(794,'Leiva',21),(795,'Linares',21),(796,'Los Andes',21),(797,'Magüí',21),
(798,'Mallama',21),(799,'Mosquera',21),(800,'Nariño',21),(801,'Olaya Herrera',21),
(802,'Ospina',21),(803,'Policarpa',21),(804,'Potosí',21),(805,'Providencia',21),
(806,'Puerres',21),(807,'Pupiales',21),(808,'Ricaurte',21),(809,'Roberto Payán',21),
(810,'Samaniego',21),(811,'San Bernardo',21),(812,'San Lorenzo',21),
(813,'San Pablo',21),(814,'San Pedro de Cartago',21),(815,'Sandoná',21),
(816,'Santa Bárbara',21),(817,'Santacruz',21),(818,'Sapuyes',21),
(819,'Taminango',21),(820,'Tangua',21),(821,'Tumaco',21),(822,'Túquerres',21),
(823,'Yacuanquer',21),
(824,'Cúcuta',22),(825,'Ábrego',22),(826,'Arboledas',22),(827,'Bochalema',22),
(828,'Bucarasica',22),(829,'Cáchira',22),(830,'Cácota',22),(831,'Chinácota',22),
(832,'Chitagá',22),(833,'Convención',22),(834,'Cucutilla',22),(835,'Durania',22),
(836,'El Carmen',22),(837,'El Tarra',22),(838,'El Zulia',22),(839,'Gramalote',22),
(840,'Hacarí',22),(841,'Herrán',22),(842,'La Esperanza',22),(843,'La Playa',22),
(844,'Labateca',22),(845,'Los Patios',22),(846,'Lourdes',22),(847,'Mutiscua',22),
(848,'Ocaña',22),(849,'Pamplona',22),(850,'Pamplonita',22),(851,'Puerto Santander',22),
(852,'Ragonvalia',22),(853,'Salazar',22),(854,'San Calixto',22),
(855,'San Cayetano',22),(856,'Santiago',22),(857,'Sardinata',22),(858,'Silos',22),
(859,'Teorama',22),(860,'Tibú',22),(861,'Toledo',22),(862,'Villa Caro',22),
(863,'Villa del Rosario',22),
(864,'Mocoa',23),(865,'Colón',23),(866,'Leguízamo',23),(867,'Orito',23),
(868,'Puerto Asís',23),(869,'Puerto Caicedo',23),(870,'Puerto Guzmán',23),
(871,'San Francisco',23),(872,'San Miguel',23),(873,'Santiago',23),
(874,'Sibundoy',23),(875,'Valle del Guamuéz',23),(876,'Villagarzón',23),
(877,'Armenia',24),(878,'Buenavista',24),(879,'Calarcá',24),(880,'Circasia',24),
(881,'Córdoba',24),(882,'Filandia',24),(883,'Génova',24),(884,'La Tebaida',24),
(885,'Montenegro',24),(886,'Pijao',24),(887,'Quimbaya',24),(888,'Salento',24),
(889,'Pereira',25),(890,'Apía',25),(891,'Balboa',25),(892,'Belén de Umbría',25),
(893,'Dosquebradas',25),(894,'Guática',25),(895,'La Celia',25),(896,'La Virginia',25),
(897,'Marsella',25),(898,'Mistrató',25),(899,'Pueblo Rico',25),(900,'Quinchía',25),
(901,'Santa Rosa de Cabal',25),(902,'Santuario',25),
(903,'San Andrés',26),(904,'Providencia',26),
(905,'Bucaramanga',27),(906,'Aguada',27),(907,'Albania',27),(908,'Aratoca',27),
(909,'Barbosa',27),(910,'Barichara',27),(911,'Barrancabermeja',27),(912,'Betulia',27),
(913,'Bolívar',27),(914,'Cabrera',27),(915,'California',27),(916,'Capitanejo',27),
(917,'Carcasí',27),(918,'Cepitá',27),(919,'Cerrito',27),(920,'Charalá',27),
(921,'Charta',27),(922,'Chima',27),(923,'Chipatá',27),(924,'Cimitarra',27),
(925,'Concepción',27),(926,'Confines',27),(927,'Contratación',27),(928,'Coromoro',27),
(929,'Curití',27),(930,'El Carmen de Chucurí',27),(931,'El Guacamayo',27),
(932,'El Peñón',27),(933,'El Playón',27),(934,'Encino',27),(935,'Enciso',27),
(936,'Florián',27),(937,'Floridablanca',27),(938,'Galán',27),(939,'Gámbita',27),
(940,'Girón',27),(941,'Guaca',27),(942,'Guadalupe',27),(943,'Guapotá',27),
(944,'Guavatá',27),(945,'Güepsa',27),(946,'Hato',27),(947,'Jesús María',27),
(948,'Jordán',27),(949,'La Belleza',27),(950,'La Paz',27),(951,'Landázuri',27),
(952,'Lebrija',27),(953,'Los Santos',27),(954,'Macaravita',27),(955,'Málaga',27),
(956,'Matanza',27),(957,'Mogotes',27),(958,'Molagavita',27),(959,'Ocamonte',27),
(960,'Oiba',27),(961,'Onzaga',27),(962,'Palmar',27),(963,'Palmas del Socorro',27),
(964,'Páramo',27),(965,'Piedecuesta',27),(966,'Pinchote',27),
(967,'Puente Nacional',27),(968,'Puerto Parra',27),(969,'Puerto Wilches',27),
(970,'Rionegro',27),(971,'Sabana de Torres',27),(972,'San Andrés',27),
(973,'San Benito',27),(974,'San Gil',27),(975,'San Joaquín',27),
(976,'San José de Miranda',27),(977,'San Miguel',27),(978,'San Vicente de Chucurí',27),
(979,'Santa Bárbara',27),(980,'Santa Helena del Opón',27),(981,'Simacota',27),
(982,'Socorro',27),(983,'Suaita',27),(984,'Sucre',27),(985,'Suratá',27),
(986,'Tona',27),(987,'Valle de San José',27),(988,'Vélez',27),(989,'Vetas',27),
(990,'Villanueva',27),(991,'Zapatoca',27),
(992,'Sincelejo',28),(993,'Buenavista',28),(994,'Caimito',28),(995,'Chalán',28),
(996,'Colosó',28),(997,'Corozal',28),(998,'Coveñas',28),(999,'El Roble',28),
(1000,'Galeras',28),(1001,'Guaranda',28),(1002,'La Unión',28),(1003,'Los Palmitos',28),
(1004,'Majagual',28),(1005,'Morroa',28),(1006,'Ovejas',28),(1007,'Palmito',28),
(1008,'Sampués',28),(1009,'San Benito Abad',28),(1010,'San Juan de Betulia',28),
(1011,'San Marcos',28),(1012,'San Onofre',28),(1013,'San Pedro',28),
(1014,'San Luis de Sincé',28),(1015,'Sincé',28),(1016,'Sucre',28),
(1017,'Tolú',28),(1018,'Tolúviejo',28),
(1019,'Ibagué',29),(1020,'Alpujarra',29),(1021,'Alvarado',29),(1022,'Ambalema',29),
(1023,'Anzoátegui',29),(1024,'Armero',29),(1025,'Ataco',29),(1026,'Cajamarca',29),
(1027,'Carmen de Apicalá',29),(1028,'Casabianca',29),(1029,'Chaparral',29),
(1030,'Coello',29),(1031,'Coyaima',29),(1032,'Cunday',29),(1033,'Dolores',29),
(1034,'Espinal',29),(1035,'Falan',29),(1036,'Flandes',29),(1037,'Fresno',29),
(1038,'Guamo',29),(1039,'Herveo',29),(1040,'Honda',29),(1041,'Icononzo',29),
(1042,'Lérida',29),(1043,'Líbano',29),(1044,'Mariquita',29),(1045,'Melgar',29),
(1046,'Murillo',29),(1047,'Natagaima',29),(1048,'Ortega',29),(1049,'Palocabildo',29),
(1050,'Piedras',29),(1051,'Planadas',29),(1052,'Prado',29),(1053,'Purificación',29),
(1054,'Rioblanco',29),(1055,'Roncesvalles',29),(1056,'Rovira',29),(1057,'Saldaña',29),
(1058,'San Antonio',29),(1059,'San Luis',29),(1060,'Santa Isabel',29),
(1061,'Suárez',29),(1062,'Valle de San Juan',29),(1063,'Venadillo',29),
(1064,'Villahermosa',29),(1065,'Villarrica',29),
(1066,'Cali',30),(1067,'Alcalá',30),(1068,'Andalucía',30),(1069,'Ansermanuevo',30),
(1070,'Argelia',30),(1071,'Bolívar',30),(1072,'Buenaventura',30),(1073,'Buga',30),
(1074,'Bugalagrande',30),(1075,'Caicedonia',30),(1076,'Calima',30),
(1077,'Candelaria',30),(1078,'Cartago',30),(1079,'Dagua',30),(1080,'El Águila',30),
(1081,'El Cairo',30),(1082,'El Cerrito',30),(1083,'El Dovio',30),(1084,'Florida',30),
(1085,'Ginebra',30),(1086,'Guacarí',30),(1087,'Jamundí',30),(1088,'La Cumbre',30),
(1089,'La Unión',30),(1090,'La Victoria',30),(1091,'Obando',30),(1092,'Palmira',30),
(1093,'Pradera',30),(1094,'Restrepo',30),(1095,'Riofrío',30),(1096,'Roldanillo',30),
(1097,'San Pedro',30),(1098,'Sevilla',30),(1099,'Toro',30),(1100,'Trujillo',30),
(1101,'Tuluá',30),(1102,'Ulloa',30),(1103,'Versalles',30),(1104,'Vijes',30),
(1105,'Yotoco',30),(1106,'Yumbo',30),(1107,'Zarzal',30),
(1108,'Mitú',31),(1109,'Carurú',31),(1110,'Pacoa',31),(1111,'Papunaua',31),
(1112,'Taraira',31),(1113,'Yavaraté',31),
(1114,'Puerto Carreño',32),(1115,'Cumaribo',32),(1116,'La Primavera',32),
(1117,'Santa Rosalía',32);

ALTER TABLE `municipio`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1118;

-- ============================================================
-- PASO 6: RECREAR `proveedores` (versión correcta)
-- Con id_proveedor, nit, id_municipio y estado como tinyint.
-- ============================================================

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` varchar(50) NOT NULL,
  `razon_social` varchar(255) NOT NULL,
  `nombre_contacto` varchar(50) NOT NULL,
  `telefono_contacto` varchar(10) NOT NULL,
  `correo_contacto` varchar(100) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `id_departamento` int(2) DEFAULT NULL,
  `nit` varchar(20) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_contacto` (`correo_contacto`),
  UNIQUE KEY `nit` (`nit`),
  UNIQUE KEY `razon_social` (`razon_social`),
  KEY `id_departamento` (`id_departamento`),
  KEY `fk_proveedor_municipio` (`id_municipio`),
  CONSTRAINT `fk_proveedor_municipio` FOREIGN KEY (`id_municipio`)
    REFERENCES `municipio` (`id_municipio`),
  CONSTRAINT `proveedores_ibfk_1` FOREIGN KEY (`id_departamento`)
    REFERENCES `departamento` (`id_departamento`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================================
-- PASO 7: INSERTAR DATOS DE PRUEBA EN PROVEEDORES
-- ============================================================

INSERT INTO `proveedores` (`id`, `nombre_proveedor`, `razon_social`, `nombre_contacto`, `telefono_contacto`, `correo_contacto`, `direccion`, `estado`, `id_departamento`, `nit`, `id_municipio`) VALUES
(1, 'pepito perez',        'pepito perez sas',            'Javier',   '3130000002', 'tech@correo.com',  'Carrera 11 # 37-20', 1, 23, '12345678-2', 873),
(3, 'pepito perez',        'pepito perez',                'Javier',   '3104339122', 'tec@correo.com',   'Carrera 11 # 37-20', 0, 18, '12345678-3', 685),
(4, 'Distribuciones Lopez','Distribuciones Lopez SAS',    'Federico', '3104339123', 'lucho@correo.com', 'Carrera 11 # 37-20', 1,  2, '12345678-4', 12),
(8, 'Comercializadora',    'jonthan sas',                 'Laura',    '3104339122', 'lopez@correo.com', 'Carrera 11 # 37-20', 0, 12, '12355678-2', 462),
(9, 'Distribuciones Lopez','Distribuciones marulo SAS',   'Federico', '3104339122', 'marulo@correo.com','Carrera 11 # 37-20', 1, 10, '12340078-2', 405);

ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

-- ============================================================
-- PASO 8: RESTAURAR VERIFICACIÓN DE LLAVES FORÁNEAS
-- ============================================================

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

-- ============================================================
--  MIGRACIÓN COMPLETADA
--  Tablas actualizadas: departamento, municipio, proveedores
--  Tablas sin cambios:  todas las demás (usuarios, roles,
--  medicamentos, ventas, carrito_compra, permisos, etc.)
-- ============================================================
