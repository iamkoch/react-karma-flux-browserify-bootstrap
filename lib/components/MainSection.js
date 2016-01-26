var React = require('react');

var MainSection = React.createClass({

  render: function() {
    var lis = this.props.items.items.map(function(x) {
      return (
          <li>{x.term}</li>
      );
    });

    return (
      <main>
        <ul>
          {lis}
        </ul>
      </main>
    );
  }
});

module.exports = MainSection;