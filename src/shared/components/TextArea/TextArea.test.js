// import React from 'react';
// import { shallow } from 'enzyme';
// import { shallowToJson } from 'enzyme-to-json';
// import Adapter from 'enzyme-adapter-react-15';
// import {TextArea} from './TextArea.second';

// describe('Link', () => {
//     it('should render correctly', () => {
//         const output = shallow(
//             <TextArea />
//     );
//         expect(shallowToJson(output)).toMatchSnapshot();
//     });
// });
import React from 'react';
import renderer from 'react-test-renderer';
import { TextArea } from './TextArea.second';
describe('Counter', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<TextArea/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});