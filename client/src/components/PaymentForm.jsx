import { Component } from 'react';
import {
  Elements,
  ElementsConsumer,
  CardElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

class NonInjectedPaymentForm extends Component {
  handleFormSubmission = (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    const cardElement = elements.getElement(CardElement);

    stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement
      })
      .then((result) => {
        const { paymentMethod, error } = result;
        if (error) {
          alert('There was an error processing your payment method details.');
          console.log(error);
        } else if (paymentMethod) {
          const paymentMethodToken = paymentMethod.id;
          this.props.onConfirmPaymentMethod(paymentMethodToken);
        }
      })
      .catch((error) => {
        alert('Error');
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <button style={{ margin: 'auto' }} className="logOutButton">
          <ThumbUpAltIcon />
        </button>
      </form>
    );
  }
}

const STRIPE_PUBLIC_API_KEY =
  'pk_test_51JxqnFGTU6zPigc4pah7hz2ZJtohOdbWtUMbHGtbhrUsf1xIqpz9fJ43677JTkUCRJqWOqhe4sdnNGKf7dqQBwOG00iehORWxg';

class PaymentForm extends Component {
  constructor() {
    super();
    this.state = {
      stripePromise: loadStripe(STRIPE_PUBLIC_API_KEY)
    };
  }

  render() {
    return (
      <Elements stripe={this.state.stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <NonInjectedPaymentForm
              stripe={stripe}
              elements={elements}
              {...this.props}
            />
          )}
        </ElementsConsumer>
      </Elements>
    );
  }
}

export default PaymentForm;
