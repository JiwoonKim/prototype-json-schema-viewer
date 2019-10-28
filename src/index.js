import React from "react";
import ReactDOM from "react-dom";
import SchemaViewer from "./SchemaViewer";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewer: "example"
    };
  }

  handleToggle(e) {
    this.setState({
      viewer: e.target.value
    });
  }

  view(uri) {
    const schema = require(`${uri}`);
    return <SchemaViewer schema={schema} schemaSource={uri} />;
  }

  renderExampleSchema() {
    const example = "./schemas/example.json";
    return (
      <div>
        <h3> Example Schema </h3>
        <p>actual JSON example used in Taskcluster</p>
        {this.view(example)}
      </div>
    );
  }

  renderDefaultDataType() {
    const defaultDataType = "./schemas/data-types/default-data-type.json";
    return (
      <div>
        <h3> Default Data Type </h3>
        <p>string, number, integer, boolean, null</p>
        {this.view(defaultDataType)}
      </div>
    );
  }

  renderArrayTypes = () => {
    const arrayTypeList =
      "./schemas/data-types/array-type-list-validation.json";
    const arrayTypeTuple =
      "./schemas/data-types/array-type-tuple-validation.json";
    const arrayTypeComplex =
      "./schemas/data-types/array-type-complex-example.json";

    return (
      <div>
        <h3> Array Types </h3>
        <p>
          uses <strong className="arrayItem"> &#10551; </strong> to indicate
          array item types
        </p>
        {this.view(arrayTypeComplex)}
        <h3>(1) list validation</h3>
        <p>list validation schemas are displayed</p>
        {this.view(arrayTypeList)}
        <h3>(2) tuple validation</h3>
        <p>tuple validation schemas are displayed</p>
        {this.view(arrayTypeTuple)}
      </div>
    );
  };

  renderObjectType = () => {
    const objectType = "./schemas/data-types/object-type.json";
    return (
      <div>
        <h3>Object Type</h3>
        <p>depicts nested structure</p>
        {this.view(objectType)}
      </div>
    );
  };

  renderRefType = () => {
    const refSchema = "./schemas/data-types/ref-schema.json";
    const refCircularReference =
      "./schemas/data-types/ref-circular-reference.json";
    return (
      <div>
        <h3> Ref Types </h3>
        <p>expand or shrink &#36;ref</p>
        <p className="warning">click (+) to expand and (-) to shrink</p>
        {this.view(refSchema)}
        <h3>Circular References</h3>
        <p>dereference $ref one level at a time</p>
        <p className="warning">not fully implemented YET!</p>
        <p className="warning">
          but can open first $ref and get a taste of how $refs will open only
          one level at a time :)
        </p>
        {this.view(refCircularReference)}
      </div>
    );
  };

  renderButtons() {
    return (
      <div>
        <h2>JSON Schema Viewer Demo :)</h2>
        <p className="warning">
          table columns do not align at the moment! (yellow = json data
          structure || white = meta data & info)
        </p>
        <p className="warning">
          but the lengths of the yellow coloring indicates same level of
          indentation :) The shorter the row is, the more it is nested within!
        </p>
        <div className="buttons">
          <button
            className="tab"
            value="example"
            onClick={e => this.handleToggle(e)}
          >
            Example Schema
          </button>
          <button
            className="tab"
            value="default type"
            onClick={e => this.handleToggle(e)}
          >
            Default Types
          </button>
          <button
            className="tab"
            value="array type"
            onClick={e => this.handleToggle(e)}
          >
            Array Types
          </button>
          <button
            className="tab"
            value="object type"
            onClick={e => this.handleToggle(e)}
          >
            Object Types
          </button>
          <button
            className="tab"
            value="ref type"
            onClick={e => this.handleToggle(e)}
          >
            Ref Types
          </button>
          <span>click to view specific implementations!</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderButtons()}
        {this.state.viewer === "default type"
          ? this.renderDefaultDataType()
          : this.state.viewer === "array type"
          ? this.renderArrayTypes()
          : this.state.viewer === "object type"
          ? this.renderObjectType()
          : this.state.viewer === "ref type"
          ? this.renderRefType()
          : this.renderExampleSchema()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
