import * as React from "react";
import "./Hello.scss"

interface Props {}
interface State {}

class Hello extends React.Component<Props, State> {
  message = () => "Hello World"

  render() {
    return (
      <div>{ this.message() }</div>
    );
  }
}

export default Hello;
