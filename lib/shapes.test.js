const {Square, Triangle, Circle} = require('./shapes.js');

describe('Triangle', () => {
    describe('render', () => {
        it('should render a shape of the given color', () => {
            const shape = new Triangle();
            shape.setColor('blue');
            expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />')
        });
    });
});