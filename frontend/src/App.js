import React from 'react'
import Backdrop from './components/Backdrop/Backdrop'


const App = () => {
    return (
        <div className={"app dark"}>
			<Backdrop show={true}>
			</Backdrop>
		</div>
      )
}

export default App