USE organizer;

INSERT INTO Department (Department_name)
VALUES 
    ('Finance'),
    ('Quality'),
    ('Management'),
    ('Marketing'),
    ('Operations'),
    ('Mainatainance');

INSERT INTO Roles (title, salary, Department_id)
VALUES
    ('Manager', '150000', 3),
    ('StaffMember', '90000', 4),
    ('Trainee', '50000', 5);

INSERT INTO Employee (first_name, last_name,department, salary, role_id, manager_id)
VALUES
    ('David', 'Summers','Management', '150000', 1, NULL),
    ('Graham', 'White','Management', '150000', 1, 1),
    ('Katie', 'soloman', 'Management', '150000', 1, 1),
    ('cathy', 'Koelman', 'Management', '150000', 1, 1),
    ('Sharon', 'Black', 'Quality', '50000', 3, 2),
    ('Falguni', 'Smith', 'Finance', '90000', 2, 2),
    ('Kelvin', 'Summers', 'Finance', '90000',2, 2),
    ('Wilson', 'Evans', 'Quality', '90000',2, 3),
    ('Sharmin', 'Kristi', 'Quality', '90000',2, 3),
    ('William', 'Robert','Operations', '90000', 2, 3),
    ('larry', 'Lovegood', 'Operations', '90000',2, 3),
    ('Falcia', 'Collins', 'Mainatainance', '90000',2, 4),
    ('Gavin', 'Felcon', 'Marketing', '50000',3, 4),
    ('Kenie', 'Storms', 'Marketing', '90000',2, 4),
    ('Marie', 'Mavins', 'Mainatainance', '90000',2, 4);
