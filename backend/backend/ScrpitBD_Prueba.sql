-- ========================================
-- PRIMERA PARTE: INSERCIÓN DE CURSOS
-- ========================================
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1701106', 'Fundamentos de la Programacion 1', 1);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1701212', 'Programacion Web 1', 1);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1701213', 'Fundamentos de Programacion 2', 1);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1702122', 'Programacion Web 2', 2);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1702124', 'Estructura de Datos y Algoritmos', 2);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1702226', 'Estadistica Matematica, Probabilidades y Metodos Empiricos', 2);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1702227', 'Arquitectura de Computadoras', 2);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1702228', 'Metodos de Investigacion y Redaccion', 2);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1702229', 'Interaccion Humano Computador', 2);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1702231', 'Analisis y Diseno de Algoritmos', 2);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703133', 'Base de Datos', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703134', 'Programacion de Sistemas', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703136', 'Teoria de la Computacion', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703137', 'Organizacion y Metodos', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703138', 'Investigacion de Operaciones', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703239', 'Redes y Comunicacion de Datos', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703240', 'Tecnologia de Objetos', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703241', 'Sistemas Operativos', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703242', 'Fundamentos de Sistemas de Informacion', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703243', 'Construccion de Software', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1703244', 'Metodos Numericos', 3);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704147', 'Tecnologias de Informacion', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704149', 'Ingenieria de Requerimientos', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704150', 'Sistemas Distribuidos', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704151', 'Pruebas de Software', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704252', 'Gestion de Proyectos de Software', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704254', 'Calidad de Software', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704255', 'Auditoria de Sistemas', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704256', 'Diseno y Arquitectura de Software', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704257', 'Negocios Electronicos', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704258', 'Introduccion al Desarrollo de Software de Entretenimiento', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704259', 'Introduccion al Desarrollo de Nuevas Plataformas', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1704260', 'Aspectos Formales de Especificacion y Verificacion', 4);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705161', 'Proyecto de Ingenieria de Software 1', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705164', 'Seguridad Informatica', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705165', 'Mantenimiento, Configuracion y Evolucion de Software', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705168', 'Computacion Grafica, Vision Computacional y Multimedia', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705169', 'Desarrollo Avanzado en Nuevas Plataformas', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705270', 'Topicos Avanzados en Ingenieria de Software', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705272', 'Proyecto de Ingenieria de Software 2', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705273', 'Gestion de Sistemas y Tecnologias de Informacion', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705275', 'Desarrollo de Software para Juegos', 5);
INSERT INTO courses (course_code, course_name, course_year) VALUES ('1705276', 'Plataformas Emergentes', 5);


-- ========================================
-- SEGUNDA PARTE: INSERCIÓN DE CURSOS
-- ========================================
-- ===============================================
-- SEGUNDA PARTE: INSERCIÓN DE GRUPOS POR CURSO
-- Se insertan los grupos A, B, C, D y E para cada curso
-- ===============================================
INSERT INTO course_groups (course_group_code, group_name, course_code) 
SELECT CONCAT(course_code, '_A'), 'A', course_code FROM courses
UNION ALL
SELECT CONCAT(course_code, '_B'), 'B', course_code FROM courses
UNION ALL
SELECT CONCAT(course_code, '_C'), 'C', course_code FROM courses
UNION ALL
SELECT CONCAT(course_code, '_D'), 'D', course_code FROM courses
UNION ALL
SELECT CONCAT(course_code, '_E'), 'E', course_code FROM courses;



-- ===============================================
-- TERCERA PARTE: INSERCIÓN DE ESTUDIANTES DE PRUEBA
-- 20 estudiantes ficticios distribuidos entre los años 1 a 5
-- ===============================================
INSERT INTO students (student_code, profile_image_name, profile_image_path, student_email, student_name, student_phone, year_study, alt_email) 
VALUES
('STU00001', NULL, NULL, 'juan.perez@unsa.edu.pe', 'JUAN PEREZ', '123456789', 1, NULL),
('STU00002', NULL, NULL, 'maria.lopez@unsa.edu.pe', 'MARIA LOPEZ', '987654321', 1, NULL),
('STU00003', NULL, NULL, 'pedro.gomez@unsa.edu.pe', 'PEDRO GOMEZ', '456789123', 1, NULL),
('STU00004', NULL, NULL, 'laura.martinez@unsa.edu.pe', 'LAURA MARTINEZ', '654321987', 2, NULL),
('STU00005', NULL, NULL, 'carla.ramos@unsa.edu.pe', 'CARLA RAMOS', '321654987', 2, NULL),
('STU00006', NULL, NULL, 'jose.sanchez@unsa.edu.pe', 'JOSE SANCHEZ', '789123456', 2, NULL),
('STU00007', NULL, NULL, 'ana.fernandez@unsa.edu.pe', 'ANA FERNANDEZ', '987123654', 2, NULL),
('STU00008', NULL, NULL, 'luis.jimenez@unsa.edu.pe', 'LUIS JIMENEZ', '543216789', 3, NULL),
('STU00009', NULL, NULL, 'jorge.perez@unsa.edu.pe', 'JORGE PEREZ', '876543210', 3, NULL),
('STU00010', NULL, NULL, 'beatriz.morales@unsa.edu.pe', 'BEATRIZ MORALES', '321789654', 3, NULL),
('STU00011', NULL, NULL, 'andrea.martin@unsa.edu.pe', 'ANDREA MARTIN', '654987321', 3, NULL),
('STU00012', NULL, NULL, 'roberto.castillo@unsa.edu.pe', 'ROBERTO CASTILLO', '987654321', 4, NULL),
('STU00013', NULL, NULL, 'susan.silva@unsa.edu.pe', 'SUSAN SILVA', '543876210', 4, NULL),
('STU00014', NULL, NULL, 'angel.martinez@unsa.edu.pe', 'ANGEL MARTINEZ', '654321987', 4, NULL),
('STU00015', NULL, NULL, 'patricia.rivera@unsa.edu.pe', 'PATRICIA RIVERA', '789123456', 4, NULL),
('STU00016', NULL, NULL, 'manuel.garcia@unsa.edu.pe', 'MANUEL GARCIA', '321654987', 4, NULL),
('STU00017', NULL, NULL, 'elena.hernandez@unsa.edu.pe', 'ELENA HERNANDEZ', '876543210', 5, NULL),
('STU00018', NULL, NULL, 'victor.rodriguez@unsa.edu.pe', 'VICTOR RODRIGUEZ', '987654321', 5, NULL),
('STU00019', NULL, NULL, 'mario.lopez@unsa.edu.pe', 'MARIO LOPEZ', '543216789', 5, NULL),
('STU00020', NULL, NULL, 'marta.sanchez@unsa.edu.pe', 'MARTA SANCHEZ', '654987321', 5, NULL);


-- ========================================
-- CUARTA PARTE - STUDENT CONFIRMATIONS
-- ========================================
INSERT INTO student_confirmations (student_confirmation_code, confirmation_status, student_code)
VALUES 
('SCFEXC000001-STU00001', 1, 'STU00001'),
('SCFEXC000001-STU00002', 1, 'STU00002'),
('SCFEXC000002-STU00003', 1, 'STU00003'),
('SCFEXC000002-STU00004', 1, 'STU00004'),
('SCFEXC000003-STU00005', 1, 'STU00005'),
('SCFEXC000003-STU00006', 1, 'STU00006'),
('SCFEXC000004-STU00007', 1, 'STU00007'),
('SCFEXC000004-STU00008', 1, 'STU00008'),
('SCFEXC000005-STU00009', 1, 'STU00009'),
('SCFEXC000005-STU00010', 1, 'STU00010'),
('SCFEXC000006-STU00011', 1, 'STU00011'),
('SCFEXC000006-STU00012', 1, 'STU00012'),
('SCFEXC000007-STU00013', 1, 'STU00013'),
('SCFEXC000007-STU00014', 1, 'STU00014'),
('SCFEXC000008-STU00015', 1, 'STU00015'),
('SCFEXC000008-STU00016', 1, 'STU00016'),
('SCFEXC000009-STU00017', 1, 'STU00017'),
('SCFEXC000009-STU00018', 1, 'STU00018'),
('SCFEXC000010-STU00019', 1, 'STU00019'),
('SCFEXC000010-STU00020', 1, 'STU00020');



-- ========================================
-- QUINTA PARTE - ADMIN CONFIRMATIONS
-- ========================================
INSERT INTO admin_confirmations (admin_confirmation_code, confirmation_status, confirmation_date)
VALUES
('ADMEXC000001', 0, '2025-06-20'),
('ADMEXC000002', 1, NULL),
('ADMEXC000003', 2, '2025-06-21'),
('ADMEXC000004', 0, NULL),
('ADMEXC000005', 1, '2025-06-22'),
('ADMEXC000006', 2, '2025-06-23'),
('ADMEXC000007', 0, NULL),
('ADMEXC000008', 1, '2025-06-24'),
('ADMEXC000009', 2, NULL),
('ADMEXC000010', 0, '2025-06-25');



-- ========================================
-- SEXTA PARTE - INTERCAMBIOS
-- ========================================

INSERT INTO exchanges (
  exchange_code,
  student_code1,
  student_code2,
  offered_course_group_code,
  desired_course_group_code,
  student_confirmation_code1,
  student_confirmation_code2,
  admin_confirmation_code,
  created_at
) VALUES 
('EXC000001', 'STU00001', 'STU00002', '1701106_A', '1701212_B', 'SCFEXC000001-STU00001', 'SCFEXC000001-STU00002', 'ADMEXC000001', NOW()),
('EXC000002', 'STU00003', 'STU00004', '1701213_C', '1702122_A', 'SCFEXC000002-STU00003', 'SCFEXC000002-STU00004', 'ADMEXC000002', NOW()),
('EXC000003', 'STU00005', 'STU00006', '1702124_B', '1702226_D', 'SCFEXC000003-STU00005', 'SCFEXC000003-STU00006', 'ADMEXC000003', NOW()),
('EXC000004', 'STU00007', 'STU00008', '1702228_E', '1702231_C', 'SCFEXC000004-STU00007', 'SCFEXC000004-STU00008', 'ADMEXC000004', NOW()),
('EXC000005', 'STU00009', 'STU00010', '1703133_B', '1703136_A', 'SCFEXC000005-STU00009', 'SCFEXC000005-STU00010', 'ADMEXC000005', NOW()),
('EXC000006', 'STU00011', 'STU00012', '1703134_C', '1703137_B', 'SCFEXC000006-STU00011', 'SCFEXC000006-STU00012', 'ADMEXC000006', NOW()),
('EXC000007', 'STU00013', 'STU00014', '1703138_A', '1703239_E', 'SCFEXC000007-STU00013', 'SCFEXC000007-STU00014', 'ADMEXC000007', NOW()),
('EXC000008', 'STU00015', 'STU00016', '1703240_B', '1703241_C', 'SCFEXC000008-STU00015', 'SCFEXC000008-STU00016', 'ADMEXC000008', NOW()),
('EXC000009', 'STU00017', 'STU00018', '1703242_D', '1703243_A', 'SCFEXC000009-STU00017', 'SCFEXC000009-STU00018', 'ADMEXC000009', NOW()),
('EXC000010', 'STU00019', 'STU00020', '1703244_E', '1704147_B', 'SCFEXC000010-STU00019', 'SCFEXC000010-STU00020', 'ADMEXC000010', NOW());
