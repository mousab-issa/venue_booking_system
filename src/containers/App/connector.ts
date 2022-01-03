import { connect } from 'react-redux';


const mapState = (state: TypeAppProps) => ({
    // data: state.hotels.data,
    // status: state.hotels.status,
    // error: state.hotels.error
});

const mapDispatch = {
    onInitReservationForm: () => console.log('Hello')
    
};

const connector = connect(mapState, mapDispatch);

export default connector;
