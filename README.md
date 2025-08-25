# Care Sphere - Healthcare Management System

A comprehensive healthcare management platform for senior living communities, built with modern web technologies to provide an intuitive and efficient way to manage resident care, medications, staff scheduling, and more.

## 🏥 Features

### Core Functionality
- **Dashboard Overview** - Real-time metrics, occupancy tracking, and quick actions
- **Resident Management** - Complete resident profiles, care levels, and status tracking
- **Medication Tracking** - Schedule management, administration tracking, and compliance monitoring
- **Care Plans** - Individualized care planning, progress tracking, and goal management
- **Staff Scheduling** - Weekly calendar view, shift management, and staff utilization
- **Reports & Analytics** - Comprehensive healthcare analytics and performance insights

### Key Capabilities
- **Real-time Monitoring** - Live updates on resident status, medication schedules, and staff assignments
- **Compliance Tracking** - Medication administration compliance and care plan adherence
- **Staff Management** - Role-based access, scheduling, and performance metrics
- **Data Visualization** - Interactive charts and graphs for better decision making
- **Responsive Design** - Mobile-friendly interface for on-the-go healthcare professionals

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom healthcare design system
- **Charts**: Recharts for data visualization
- **Icons**: Heroicons and Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Next.js App Router

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/care-sphere.git
   cd care-sphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
care-sphere/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main dashboard page
├── components/             # React components
│   ├── DashboardOverview.tsx      # Main dashboard with metrics
│   ├── ResidentManagement.tsx     # Resident management interface
│   ├── MedicationTracking.tsx     # Medication tracking system
│   ├── CarePlans.tsx             # Care plan management
│   ├── StaffScheduling.tsx       # Staff scheduling calendar
│   └── Reports.tsx               # Analytics and reporting
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for main actions and navigation
- **Healthcare**: Green tones for success states and health indicators
- **Warning**: Orange tones for alerts and pending items
- **Danger**: Red tones for critical alerts and errors

### Components
- **Cards**: Consistent container styling with shadows and borders
- **Buttons**: Multiple variants (primary, secondary, success, warning, danger)
- **Status Badges**: Color-coded status indicators
- **Input Fields**: Consistent form styling with focus states
- **Tables**: Responsive data tables with hover effects

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1024px+)
- Tablets (768px - 1023px)
- Mobile devices (320px - 767px)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏥 Healthcare Features

### Resident Management
- Personal information and medical history
- Care level classification (Independent, Assisted, Memory Care, Skilled Nursing)
- Room assignments and status tracking
- Emergency contact information

### Medication Tracking
- Medication schedules and dosages
- Administration tracking with timestamps
- Compliance monitoring and reporting
- Refill alerts and supply management

### Care Plans
- Individualized care goals and objectives
- Progress tracking and milestone management
- Staff assignments and responsibilities
- Regular review scheduling

### Staff Scheduling
- Weekly calendar view with shift management
- Role-based scheduling (Nurses, Caregivers, Therapists)
- Staff utilization tracking
- Shift coverage monitoring

### Reporting & Analytics
- Occupancy trends and admission rates
- Medication compliance metrics
- Care plan effectiveness
- Staff productivity and satisfaction
- Financial performance indicators

## 🔒 Security & Compliance

- Role-based access control
- Secure data handling
- HIPAA-compliant design principles
- Audit trail capabilities

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **AWS Amplify**: Connect repository and configure build settings
- **Docker**: Use the provided Dockerfile for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🔮 Future Enhancements

- **Mobile App**: Native iOS and Android applications
- **AI Integration**: Predictive analytics and smart scheduling
- **Telehealth**: Video conferencing and remote monitoring
- **Integration**: EHR system integrations and API connections
- **Advanced Analytics**: Machine learning for care optimization

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons from Heroicons and Lucide React
- Charts powered by Recharts
- Healthcare industry best practices and standards

---

**Care Sphere** - Empowering healthcare professionals with modern, intuitive tools for better resident care.