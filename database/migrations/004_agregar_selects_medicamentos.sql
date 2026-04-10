-- ============================================================
-- INSERT DE FORMA FARMACEUTICA
-- ============================================================
INSERT INTO forma_farmaceutica (nombre_forma_farmaceutica) VALUES
('Especial'),
('Líquidas'),
('Gaseosas'),
('Semisólidas'),
('Sólidas');
-- ============================================================
-- INSERT DE PRESENTACION(SUB FORMA FARMACEUTICA) ESPECIAL (ID = 1)
-- ============================================================
INSERT INTO subforma_farmaceutica (nombre_subforma_farmaceutica, id_forma_farmaceutica) VALUES
('Colirio', 1),
('Colutorio', 1),
('Enjuague Bucal', 1),
('Dentífrico', 1),
('Desinfectante - Antiséptico', 1),
('Loción', 1),
('Parche transdérmico', 1),
('Pomada oftálmica', 1),
('Solución nasal - Spray nasal', 1);    
-- ============================================================
-- INSERT DE PRESENTACION(SUB FORMA FARMACEUTICA) LÍQUIDAS (ID = 2)
-- ============================================================
INSERT INTO subforma_farmaceutica (nombre_subforma_farmaceutica, id_forma_farmaceutica) VALUES
('Enema', 2),
('Emulsión', 2),
('Gotas', 2),
('Infusión - Concentrado para diluir', 2),
('Inyectable - Ampolla - Frasco ámpula', 2),
('Jarabe', 2),
('Solución oral', 2),
('Suspensión', 2);
-- ============================================================
-- INSERT DE PRESENTACION(SUB FORMA FARMACEUTICA) GASEOSAS (ID = 3)
-- ============================================================
INSERT INTO subforma_farmaceutica (nombre_subforma_farmaceutica, id_forma_farmaceutica) VALUES
('Aerosol - Spray', 3),
('Inhalador', 3),
('Nebulizador', 3);
-- ============================================================
-- INSERT DE PRESENTACION(SUB FORMA FARMACEUTICA) SEMISÓLIDAS (ID = 4)
-- ============================================================
INSERT INTO subforma_farmaceutica (nombre_subforma_farmaceutica, id_forma_farmaceutica) VALUES
('Crema', 4),
('Gel', 4),
('Linimento - Bálsamo', 4),
('Pasta', 4),
('Ungüento - Pomada', 4);
-- ============================================================
-- INSERT DE PRESENTACION(SUB FORMA FARMACEUTICA) SÓLIDAS (ID = 5)
-- ============================================================
INSERT INTO subforma_farmaceutica (nombre_subforma_farmaceutica, id_forma_farmaceutica) VALUES
('Cápsula', 5),
('Gragea', 5),
('Granulado', 5),
('Implante', 5),
('Pastilla', 5),
('Píldora', 5),
('Polvo', 5),
('Supositorio', 5),
('Óvulo', 5);
-- ============================================================
-- INSERT DE VIAS DE ADMINISTRACION
-- ============================================================
INSERT INTO via_administracion (nombre_via_administracion) VALUES
('Bucal'),
('Cutánea'),
('Inhalatoria'),
('Intrádermica'),
('Intramuscular'),
('Intravenosa'),
('Nasal'),
('Oftálmica'),
('Oral'),
('Ótica'),
('Rectal'),
('Subcutánea'),
('Sublingual'),
('Transdérmica'),
('Uretral'),
('Vaginal');
-- ============================================================
-- INSERT DE LABORATORIOS
-- ============================================================
INSERT INTO laboratorios (nombre_laboratorio) VALUES
('Abbott Laboratories de Colombia S.A.'),
('Andromaco'),
('Bagó'),
('Bayer S.A.'),
('Blaskov S.A.'),
('Boehringer Ingelheim Ltda.'),
('Colpharma S.A.'),
('Disanfar S.A.'),
('Eli Lilly Interamérica Inc.'),
('Farma de Colombia S.A.S.'),
('Genfar S.A.'),
('GlaxoSmithKline (GSK)'),
('Grünenthal de Colombia S.A.'),
('Johnson & Johnson de Colombia S.A.'),
('Lafrancol S.A.S.'),
('Laproff S.A.'),
('La Santé S.A.'),
('Merck Sharp & Dohme (MSD)'),
('MK'),
('Novartis de Colombia S.A.'),
('Pfizer Ltda.'),
('ProCaps S.A.S.'),
('Roche S.A.'),
('Ropsohn Therapeutics S.A.'),
('Sanofi Aventis de Colombia S.A.'),
('Servier de Colombia Ltda.'),
('Synthesis S.A.'),
('Tecnoquímicas S.A. (TQ)');
-- ============================================================
-- INSERT DE ESTADO MEDICAMENTO
-- ============================================================
INSERT INTO estado_medicamento (nombre_estado) VALUES
('Activo'),
('Vencido'),
('Agotado'),
('Suspendido');