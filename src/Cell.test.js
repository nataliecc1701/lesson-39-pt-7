import { render } from '@testing-library/react'
import Cell from './Cell'

it("renders", function() {
    render(<Cell flipCellsAroundMe={() => {}} isLit={false}/>)
    render(<Cell flipCellsAroundMe={() => {}} isLit={true}/>)
})

it("looks like the snapshot when false", function () {
    const {asFragment} = render(<Cell flipCellsAroundMe={() => {}} isLit={false}/>)
    expect(asFragment()).toMatchSnapshot()
})

it("looks like the snapshot when true", function () {
    const {asFragment} = render(<Cell flipCellsAroundMe={() => {}} isLit={true}/>)
    expect(asFragment()).toMatchSnapshot()
})