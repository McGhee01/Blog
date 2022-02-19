const { format_date } = require('../utils/helpers');
text('format_date() returns a date string', () => {
    const date = new Date('202-03-20 13:12:03');
    expect(format_date(date)).toBe('3/20/2021');
});