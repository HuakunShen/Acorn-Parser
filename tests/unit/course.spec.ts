import { expect } from 'chai';
import { Course } from '@/core/lib';

describe('Course', () => {
  const course1 = new Course(
    'CSC108',
    'Introduction to Computer Programming',
    0.5,
    83,
    3.7,
    3.3,
    '',
    false
  );
  const course2 = new Course(
    'CSC108',
    'Introduction to Computer Programming',
    0.5,
    83,
    3.7,
    3.3,
    'EXT',
    true
  );
  it('Test Course Functions', () => {
    expect(course1.completed()).to.equal(false);
    expect(course2.dept()).to.equal('CSC');
    expect(course1.toConsider()).to.equal(false);
    expect(course2.toConsider()).to.equal(false);
  });
});
