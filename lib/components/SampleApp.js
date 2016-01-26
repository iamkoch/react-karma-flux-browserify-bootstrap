var React = require('react'),
    Header = require('./Header'),
    Footer = require('./Footer'),
    MainSection = require('./MainSection'),
    SampleStore = require('../stores/SampleStore');

function getState() {
  return {
    items: SampleStore.getAll()
  };
}

var SampleApp = React.createClass({
  getInitialState: function() {
    return getState();
  },

  render: function() {
    return (
        <div>
          <Header />
          <MainSection
              items={this.state.items}
          />
          <Footer />
        </div>
    );
  },

  componentDidMount: function() {
    SampleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SampleStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = SampleApp;