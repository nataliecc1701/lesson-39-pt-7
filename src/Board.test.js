import { render, fireEvent } from '@testing-library/react'
import Board from './Board'

it("should display", function () {
    render(<Board />)
});

it("should match the snapshot", function() {
    // mock Math.random
    jest.spyOn(Math, 'random')
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.75)
        .mockReturnValueOnce(0.75)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.75)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.75);
    const { asFragment } = render(<Board />);
    expect(asFragment()).toMatchSnapshot();
});

it("should flip cells correctly", function() {
    // mock Math.random
    jest.spyOn(Math, 'random')
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.75)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.25);
        
    const { container } = render(<Board />);
    const MidLeftCell = container.querySelector('#cell-1-0');
    const LowerLeftCell = container.querySelector('#cell-2-0');
    const LowerMidCell = container.querySelector('#cell-2-1');
    
    // expect them to be what they should start as
    expect(MidLeftCell).toHaveClass("Cell-lit");
    expect(LowerLeftCell).toHaveClass("Cell-lit");
    expect(LowerMidCell).toHaveClass("Cell-Lit");
    
    // click
    fireEvent.click(LowerLeftCell);
    
    // expect them to have changed
    expect(MidLeftCell).not.toHaveClass("Cell-lit");
    expect(LowerLeftCell).not.toHaveClass("Cell-lit");
    expect(LowerMidCell).not.toHaveClass("Cell-Lit");
});