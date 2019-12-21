import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.flushPromises = () => new Promise(setImmediate);

Enzyme.configure({ adapter: new Adapter() });
