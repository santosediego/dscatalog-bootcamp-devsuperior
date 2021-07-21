// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';


(global as any).document.createRange = () => ({
    setStart: () => { },
    setEnd: () => { },
    selectNodeContents: () => { },
    commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
    },
});

(global as any).document.getSelection = () => ({
    getRangeAt: jest.fn(),
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
});