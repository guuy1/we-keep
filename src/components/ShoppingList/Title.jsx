// import React, { useState } from "react";
// import "./Title.css";
// import "font-awesome/css/font-awesome.min.css";

// function Title({ listKey }) {
//   const [title, setTitle] = useState("רשימת קניות");
//   console.log("dadas");
//   const handleTitle = (e) => setTitle(e.target.value);

//   return (
//     <input
//       type="text"
//       value={title}
//       onChange={handleTitle}
//       placeholder="Title"
//       className="title"
//     />
//   );
// }

// export default Title;

import React, { Component } from "react";
import { compose } from "recompose";
import "./Title.css";
import "font-awesome/css/font-awesome.min.css";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { withFirebase } from "../Firebase";

const Title = ({ listKey }) => {
  return (
    <div>
      <HendleTitle listKey={listKey} />
    </div>
  );
};

class TitleComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      lists: [],
    };
  }
  componentDidMount() {
    //import the specific list to show the items
    this.props.firebase.lists().on("value", (snapshot) => {
      const listObject = snapshot.val();
      if (listObject && listObject[this.props.listKey]) {
        const title = listObject[this.props.listKey].title;
        const items = listObject[this.props.listKey].list;
        if (items)
          this.setState({
            title: title,
            lists: items,
          });
        else {
          this.setState({
            title: title,
          });
        }
      }
    });
  }
  hendleTitle(e, authUser) {
    this.setState({ title: e.target.value }, () => {
      this.props.firebase.list(this.props.listKey).set({
        title: this.state.title,
        list: [...this.state.lists],
        user: [authUser.uid],
      });
    });
  }
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <input
            type="text"
            value={this.state.title}
            onChange={(e) => this.hendleTitle(e, authUser)}
            placeholder="Title"
            className="title"
          />
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const HendleTitle = withFirebase(TitleComp);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Title);
