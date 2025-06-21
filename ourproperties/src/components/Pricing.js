import { useState } from 'react';
import '../css/Pricing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCrown,
  faRocket,
  faStar,
  faGem,
  faQuestionCircle,
  faHeadset,
  faChartLine,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'per month',
      featured: false,
      icon: faCheck,
      features: [
        'Up to 10 property listings',
        'Basic analytics dashboard',
        'Community forum support',
        'Standard listing visibility',
        'Email notifications'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      featured: true,
      icon: faRocket,
      features: [
        'Unlimited property listings',
        'Advanced analytics with insights',
        'Priority email support',
        'Branded profile page',
        'Enhanced listing visibility',
        'Lead capture forms',
        '3D virtual tour integration'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: 'per month',
      featured: false,
      icon: faGem,
      features: [
        'Unlimited property listings',
        'Premium analytics with AI insights',
        '24/7 dedicated account manager',
        'Custom branding & white-labeling',
        'Premium placement in search results',
        'Advanced lead management',
        'API access',
        'Custom reporting'
      ],
      cta: 'Contact Sales'
    },
  ];

  const faqs = [
    {
      question: "What's included in the Basic plan?",
      answer: "The Basic plan is perfect for new agents or those with a small portfolio. It includes up to 10 property listings, basic analytics to track your performance, and access to our community forum for support."
    },
    {
      question: "How does the Professional plan differ from Basic?",
      answer: "The Professional plan removes all listing limits and adds powerful tools like advanced analytics, priority support, branded profile, enhanced visibility, and lead capture forms to help grow your business."
    },
    {
      question: "When would I need the Enterprise plan?",
      answer: "Our Enterprise plan is designed for high-volume brokers and agencies needing custom solutions, premium placement, API access, and dedicated support to manage large portfolios effectively."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely! You can upgrade, downgrade, or cancel at any time. Changes take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! The Professional plan comes with a 14-day free trial. No credit card required to try our premium features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans."
    }
  ];

  const handleSelect = (plan) => {
    setSelectedPlan(plan.name);
    // In a real app, you would redirect to checkout or show a modal
    console.log(`Selected plan: ${plan.name}`);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <h1>Find the Perfect Plan for Your Real Estate Business</h1>
        <p>Choose the package that fits your needs. Scale up anytime as your business grows.</p>
      </section>

      <div className="pricing-switch">
        <span>Monthly</span>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <span>Annual <span className="discount-badge">(Save 20%)</span></span>
      </div>

      <div className="pricing-container">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`pricing-card ${plan.featured ? 'featured' : ''} ${selectedPlan === plan.name ? 'selected' : ''}`}
            onClick={() => handleSelect(plan)}
          >
            {plan.featured && <div className="popular-badge">MOST POPULAR</div>}
            <div className="plan-header">
              <FontAwesomeIcon icon={plan.icon} className="plan-icon" />
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="amount">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
            </div>
            <ul className="features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`select-button ${plan.featured ? 'featured-button' : ''}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <section className="comparison-section">
        <h2>Plan Comparison</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Features</th>
              <th>Basic</th>
              <th>Professional</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Property Listings</td>
              <td>Up to 10</td>
              <td>Unlimited</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>Basic</td>
              <td>Advanced</td>
              <td>Premium + AI</td>
            </tr>
            <tr>
              <td>Support</td>
              <td>Community</td>
              <td>Priority Email</td>
              <td>24/7 Dedicated</td>
            </tr>
            <tr>
              <td>Branding</td>
              <td>-</td>
              <td>Branded Profile</td>
              <td>Custom White-label</td>
            </tr>
            <tr>
              <td>API Access</td>
              <td>-</td>
              <td>-</td>
              <td>✓</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} className="faq-icon" />
                <h3>{faq.question}</h3>
                <span className="toggle-icon">{expandedFaq === index ? '−' : '+'}</span>
              </div>
              {expandedFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <FontAwesomeIcon icon={faHeadset} className="cta-icon" />
          <h2>Still have questions?</h2>
          <p>Our sales team is here to help you choose the right plan for your business needs.</p>
          <button className="cta-button">
            <FontAwesomeIcon icon={faEnvelope} className="button-icon" />
            Contact Sales
          </button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;