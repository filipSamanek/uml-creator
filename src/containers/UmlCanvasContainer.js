import { connect } from 'react-redux'
import * as ElementActions from '../actions/ElementActions'
import { bindActionCreators } from 'redux'
import UmlCanvas from '../components/UmlCanvas'


const mapStateToProps = state => ({
    elements: state.umlElementsReducer
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ElementActions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UmlCanvas)

