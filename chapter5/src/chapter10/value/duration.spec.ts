import { Duration } from './duration';

describe('Value: Duration', () => {
  it('Duration.between()', () => {
    // Given
    const from = new Date('2024-05-11T10:00:00');
    const to = new Date('2024-05-11T10:01:20');

    // When
    const duration = Duration.between(from, to);

    // Then
    expect(duration.getInSecondes()).toBe(80);
  });
});
