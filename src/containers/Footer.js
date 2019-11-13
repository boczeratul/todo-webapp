import { connect } from 'react-redux'
import Footer from '../components/Footer'
import { getKarma } from '../selectors'

const mapStateToProps = state => ({
    karma: getKarma(state)
})

export default connect(mapStateToProps)(Footer)
