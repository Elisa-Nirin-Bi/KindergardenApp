import { Component } from 'react';
import {
  cancelSubscription,
  createSubscription,
  loadSubscription
} from '../services/subscription';
import PaymentForm from './../components/PaymentForm';
import DeleteIcon from '@mui/icons-material/Delete';

class SubscriptionView extends Component {
  constructor() {
    super();
    this.state = {
      subscription: null
    };
  }

  componentDidMount() {
    loadSubscription()
      .then((subscription) => {
        this.setState({ subscription });
      })
      .catch((error) => {
        alert('There was an error loading the subscription.');
        console.log(error);
      });
  }

  handleSubscriptionCreation = (paymentMethodToken) => {
    createSubscription({ paymentMethodToken })
      .then((subscription) => {
        this.setState({ subscription });
        this.props.onUserRefresh();
      })
      .catch((error) => {
        alert('There was an error creating the subscription.');
        console.log(error);
      });
  };

  handleSubscriptionCancelation = (event) => {
    event.preventDefault();
    cancelSubscription()
      .then(() => {
        this.setState({ subscription: null });
        this.props.onUserRefresh();
      })
      .catch((error) => {
        alert('There was an error canceling the subscription.');
        console.log(error);
      });
  };

  render() {
    return (
      <div className="subscription-div">
        {(this.state.subscription && (
          <div className="subscription-statusOne">
            <h2>You are an active member!</h2>
            <p>
              You have an active subscription.
              <br></br>
              Your next billing date is{' '}
              {new Date(
                this.state.subscription.nextBillingDate
              ).toLocaleDateString()}
            </p>
            <form onSubmit={this.handleSubscriptionCancelation}>
              <button>
                <DeleteIcon />
              </button>
            </form>
          </div>
        )) || (
          <div className="subscription-statusTwo">
            <h2>Please subscribe here!</h2>
            <p>
              You are not yet subscribed.
              <br></br>
              Please, fill out your credit card details and click "Subscribe".
            </p>
            <PaymentForm
              onConfirmPaymentMethod={this.handleSubscriptionCreation}
            />
            {/* <form onSubmit={this.handleSubscriptionCreation}>
              <input type="text" placeholder="Credit Card Number" />
              <button>Subscribe</button>
            </form> */}
          </div>
        )}
      </div>
    );
  }
}

export default SubscriptionView;
