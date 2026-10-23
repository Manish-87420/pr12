import { useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from 'react-router-dom'
import './App.css'

const ordersByView = {
  current: [
    { id: '#ORD-2048', customer: 'Maya Chen', initials: 'MC', date: 'Oct 23, 2025', items: 'Everyday Tote, 2 more', quantity: 3, total: '$128.00', status: 'Processing', product: '👜', color: 'lavender' },
    { id: '#ORD-2047', customer: 'Noah Williams', initials: 'NW', date: 'Oct 23, 2025', items: 'Ceramic Pour-over Set', quantity: 1, total: '$64.00', status: 'Awaiting payment', product: '☕', color: 'peach' },
    { id: '#ORD-2046', customer: 'Amara Okafor', initials: 'AO', date: 'Oct 22, 2025', items: 'Linen Table Runner, 1 more', quantity: 2, total: '$92.50', status: 'Shipped', product: '🧵', color: 'mint' },
    { id: '#ORD-2045', customer: 'Leo Martin', initials: 'LM', date: 'Oct 22, 2025', items: 'Scented Candle Trio', quantity: 1, total: '$48.00', status: 'Processing', product: '🕯️', color: 'yellow' },
  ],
  history: [
    { id: '#ORD-2044', customer: 'Sofia Patel', initials: 'SP', date: 'Oct 21, 2025', items: 'Woven Storage Basket', quantity: 1, total: '$56.00', status: 'Delivered', product: '🧺', color: 'peach' },
    { id: '#ORD-2043', customer: 'Ethan Brooks', initials: 'EB', date: 'Oct 20, 2025', items: 'Stoneware Mug Set', quantity: 2, total: '$72.00', status: 'Delivered', product: '☕', color: 'lavender' },
    { id: '#ORD-2042', customer: 'Isabella Rossi', initials: 'IR', date: 'Oct 18, 2025', items: 'Organic Cotton Throw', quantity: 1, total: '$110.00', status: 'Delivered', product: '🧶', color: 'mint' },
    { id: '#ORD-2041', customer: 'Jackson Lee', initials: 'JL', date: 'Oct 17, 2025', items: 'Glass Carafe, 2 more', quantity: 3, total: '$139.00', status: 'Delivered', product: '🫙', color: 'yellow' },
  ],
  cancelled: [
    { id: '#ORD-2040', customer: 'Ava Johnson', initials: 'AJ', date: 'Oct 16, 2025', items: 'Canvas Market Bag', quantity: 1, total: '$38.00', status: 'Cancelled', product: '👜', color: 'lavender' },
    { id: '#ORD-2039', customer: 'Liam Garcia', initials: 'LG', date: 'Oct 15, 2025', items: 'Botanical Print Set', quantity: 1, total: '$44.00', status: 'Cancelled', product: '🌿', color: 'mint' },
  ],
}

const orderViews = [
  { path: 'current', label: 'Current orders', count: ordersByView.current.length },
  { path: 'history', label: 'Order history', count: ordersByView.history.length },
  { path: 'cancelled', label: 'Cancelled orders', count: ordersByView.cancelled.length },
]

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/orders/current" aria-label="Atelier home">
        <span className="brand-icon">a.</span>
        <span>atelier<span className="brand-period">.</span></span>
      </NavLink>

      <div className="store-switcher">
        <div className="store-avatar">S</div>
        <div className="store-details">
          <span className="store-label">STORE</span>
          <strong>Studio &amp; Sage</strong>
        </div>
        <span className="switch-chevron">⌄</span>
      </div>

      <div className="nav-section-label">WORKSPACE</div>
      <nav className="primary-nav" aria-label="Main navigation">
        <a href="#dashboard" className="side-link">
          <Icon name="grid" /><span>Dashboard</span>
        </a>
        <NavLink to="/orders/current" className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
          <Icon name="bag" /><span>Orders</span><span className="side-count">6</span>
        </NavLink>
        <a href="#products" className="side-link">
          <Icon name="box" /><span>Products</span>
        </a>
        <a href="#customers" className="side-link">
          <Icon name="users" /><span>Customers</span>
        </a>
      </nav>

      <div className="nav-section-label reports-label">INSIGHTS</div>
      <nav className="primary-nav" aria-label="Insights">
        <a href="#analytics" className="side-link">
          <Icon name="chart" /><span>Analytics</span>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-mark">?</div>
          <strong>Need a hand?</strong>
          <span>Visit our help center</span>
        </div>
        <button className="account-button" type="button">
          <span className="account-avatar">OR</span>
          <span className="account-details"><strong>Olivia Rhye</strong><span>Store owner</span></span>
          <span className="account-menu">···</span>
        </button>
      </div>
    </aside>
  )
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><strong>Orders</strong></div>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Notifications">
          <Icon name="bell" size={19} /><span className="notification-dot" />
        </button>
        <span className="topbar-divider" />
        <span className="topbar-avatar">OR</span>
      </div>
    </header>
  )
}

function OrdersLayout() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All orders')

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-column">
        <Topbar />
        <main className="content">
          <div className="page-heading">
            <div>
              <div className="date-label">THURSDAY, OCTOBER 23, 2025</div>
              <h1>Orders <span className="heading-count">10</span></h1>
              <p className="heading-copy">Track, manage, and keep your orders moving.</p>
            </div>
            <button className="export-button" type="button" onClick={() => window.print()}>
              <Icon name="download" size={16} /> Export
            </button>
          </div>

          <section className="stats-grid" aria-label="Order summary">
            <article className="stat-card">
              <div className="stat-top"><span>Total orders</span><span className="stat-symbol">↗</span></div>
              <strong>248</strong>
              <div className="stat-foot"><span className="stat-growth">↑ 12.8%</span><span>vs. last month</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Awaiting fulfillment</span><span className="stat-symbol amber">◷</span></div>
              <strong>6</strong>
              <div className="stat-foot"><span className="stat-neutral">Needs attention</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Completed</span><span className="stat-symbol green">✓</span></div>
              <strong>232</strong>
              <div className="stat-foot"><span className="stat-growth">↑ 8.2%</span><span>vs. last month</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Cancelled</span><span className="stat-symbol rose">↗</span></div>
              <strong>10</strong>
              <div className="stat-foot"><span className="stat-neutral">4.0% cancellation rate</span></div>
            </article>
          </section>

          <section className="orders-panel">
            <div className="panel-header">
              <div>
                <h2>All orders</h2>
                <p>Manage and review your customer orders.</p>
              </div>
              <button className="filter-button" type="button" onClick={() => setActiveFilter(activeFilter === 'All orders' ? 'Recent orders' : 'All orders')}>
                <span className="filter-icon">☷</span>{activeFilter}<span className="filter-caret">⌄</span>
              </button>
            </div>

            <nav className="order-tabs" aria-label="Order categories">
              {orderViews.map(({ path, label, count }) => (
                <NavLink
                  key={path}
                  to={`/orders/${path}`}
                  className={({ isActive }) => `order-tab${isActive ? ' active' : ''}`}
                >
                  {label}<span className="tab-count">{count}</span>
                </NavLink>
              ))}
            </nav>

            <div className="table-toolbar">
              <label className="search-field">
                <Icon name="search" size={17} />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search orders..."
                  aria-label="Search orders"
                />
                <kbd>⌘ K</kbd>
              </label>
              <span className="results-label">Showing recent orders</span>
            </div>
            <Outlet context={{ search }} />
          </section>
          <footer className="content-footer">© 2025 Atelier Commerce <span>Made for makers, with care <b>✳</b></span></footer>
        </main>
      </div>
    </div>
  )
}

function OrdersTable({ view }) {
  const { search } = useOutletContext()
  const matchingOrders = ordersByView[view].filter((order) =>
    `${order.id} ${order.customer} ${order.items} ${order.status}`.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <div className="table-scroll">
      <table className="orders-table">
        <thead>
          <tr>
            <th><input type="checkbox" aria-label="Select all orders" /></th>
            <th>ORDER</th>
            <th>CUSTOMER</th>
            <th>DATE</th>
            <th>ITEMS</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th aria-label="Order actions" />
          </tr>
        </thead>
        <tbody>
          {matchingOrders.map((order) => (
            <tr key={order.id}>
              <td><input type="checkbox" aria-label={`Select order ${order.id}`} /></td>
              <td><span className="order-id">{order.id}</span></td>
              <td>
                <div className="customer-cell">
                  <span className={`customer-avatar avatar-${order.color}`}>{order.initials}</span>
                  <span className="customer-name">{order.customer}</span>
                </div>
              </td>
              <td className="date-cell">{order.date}</td>
              <td>
                <div className="item-cell">
                  <span className={`product-thumb thumb-${order.color}`}>{order.product}</span>
                  <span className="item-description">{order.items}<small>{order.quantity} {order.quantity === 1 ? 'item' : 'items'}</small></span>
                </div>
              </td>
              <td className="total-cell">{order.total}</td>
              <td><span className={`status-pill status-${order.status.toLowerCase().replaceAll(' ', '-')}`}><span />{order.status}</span></td>
              <td><button className="row-menu" type="button" aria-label={`More actions for ${order.id}`}>···</button></td>
            </tr>
          ))}
          {matchingOrders.length === 0 && (
            <tr><td className="empty-state" colSpan="8">No orders match “{search}”. Try a different search.</td></tr>
          )}
        </tbody>
      </table>
      <div className="table-pagination">
        <span>Showing <strong>{matchingOrders.length}</strong> of <strong>{ordersByView[view].length}</strong> orders</span>
        <div><button type="button" disabled>← Previous</button><button type="button" disabled>Next →</button></div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orders/current" replace />} />
        <Route path="orders" element={<OrdersLayout />}>
          <Route index element={<Navigate to="current" replace />} />
          <Route path="current" element={<OrdersTable view="current" />} />
          <Route path="history" element={<OrdersTable view="history" />} />
          <Route path="cancelled" element={<OrdersTable view="cancelled" />} />
          <Route path="*" element={<Navigate to="current" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/orders/current" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
