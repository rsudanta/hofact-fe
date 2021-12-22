export const formatedBadge = (badge, role) => {
    if (badge <= 99 && role == 'USER') {
        return 'Pemula';
    }
    if (badge < 200 && role == 'USER') {
        return 'Ambisius';
    }
    if (badge < 300 && role == 'USER') {
        return 'Hebat';
    }
    if (badge >= 300 && role == 'USER') {
        return 'Jenius';
    }
    if (role == 'ADMIN') {
        return 'Admin';
    }
};