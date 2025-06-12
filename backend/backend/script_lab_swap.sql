
-- SCRIPT DE INSERCIÓN DE DATOS DE PRUEBA PARA LAB SWAP
-- Fecha de generación: 2025-06-12 07:03:25

-- Limpieza previa (opcional si deseas dejar base vacía antes de insertar)
TRUNCATE TABLE exchanges, confirmation_documents, student_confirmations, admin_confirmations,
course_groups, courses, students RESTART IDENTITY CASCADE;

-- Insertar estudiantes
INSERT INTO students(student_code, student_name, student_email, student_phone, year_study)
VALUES 
('STU00001', 'Luis Pérez', 'luis@example.com', '987654321', 1),
('STU00002', 'María Gómez', 'maria@example.com', '923456789', 2),
('STU00003', 'Carlos Díaz', 'carlos@example.com', '912345678', 3);

-- Insertar cursos
INSERT INTO courses(course_code, course_name, course_year) VALUES
('COURSE001', 'MATEMÁTICA I', 1),
('COURSE002', 'FÍSICA I', 1),
('COURSE003', 'PROGRAMACIÓN I', 1),
('COURSE004', 'ESTADÍSTICA', 2),
('COURSE005', 'ALGEBRA LINEAL', 2),
('COURSE006', 'BASES DE DATOS', 3),
('COURSE007', 'SISTEMAS OPERATIVOS', 3),
('COURSE008', 'INGENIERÍA DE SOFTWARE', 4),
('COURSE009', 'REDES', 4),
('COURSE010', 'SEGURIDAD INFORMÁTICA', 5);

-- Insertar grupos para cada curso (hasta grupo F donde aplica)
INSERT INTO course_groups(course_group_code, group_name, course_code) VALUES
-- MATEMÁTICA I
('CG001', 'A', 'COURSE001'), ('CG002', 'B', 'COURSE001'), ('CG003', 'C', 'COURSE001'),
('CG004', 'D', 'COURSE001'), ('CG005', 'E', 'COURSE001'), ('CG006', 'F', 'COURSE001'),
-- FÍSICA I
('CG007', 'A', 'COURSE002'), ('CG008', 'B', 'COURSE002'), ('CG009', 'C', 'COURSE002'),
('CG010', 'D', 'COURSE002'), ('CG011', 'E', 'COURSE002'), ('CG012', 'F', 'COURSE002'),
-- PROGRAMACIÓN I
('CG013', 'A', 'COURSE003'), ('CG014', 'B', 'COURSE003'), ('CG015', 'C', 'COURSE003'),
('CG016', 'D', 'COURSE003'), ('CG017', 'E', 'COURSE003'), ('CG018', 'F', 'COURSE003'),
-- ESTADÍSTICA
('CG019', 'A', 'COURSE004'), ('CG020', 'B', 'COURSE004'), ('CG021', 'C', 'COURSE004'),
-- ALGEBRA LINEAL
('CG022', 'A', 'COURSE005'), ('CG023', 'B', 'COURSE005'), ('CG024', 'C', 'COURSE005'),
-- BASES DE DATOS
('CG025', 'A', 'COURSE006'), ('CG026', 'B', 'COURSE006'),
-- SISTEMAS OPERATIVOS
('CG027', 'A', 'COURSE007'), ('CG028', 'B', 'COURSE007'),
-- INGENIERÍA DE SOFTWARE
('CG029', 'A', 'COURSE008'), ('CG030', 'B', 'COURSE008'),
-- REDES
('CG031', 'A', 'COURSE009'),
-- SEGURIDAD INFORMÁTICA
('CG032', 'A', 'COURSE010');
