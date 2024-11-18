import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';

describe('Dashboard', () => {
  it('renders the dashboard layout with all required sections', () => {
    render(<Dashboard />);
    
    // Header section
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
    
    // Account configuration section
    expect(screen.getByTestId('account-config')).toBeInTheDocument();
    expect(screen.getByAltText('Logo de l\'organisation')).toBeInTheDocument();
    
    // Wallet section
    expect(screen.getByTestId('dashboard-wallet')).toBeInTheDocument();
    expect(screen.getByText('Votre solde')).toBeInTheDocument();
    
    // Quick actions section
    expect(screen.getByTestId('quick-actions')).toBeInTheDocument();
    expect(screen.getByText('Actions rapides')).toBeInTheDocument();
    
    // News section
    expect(screen.getByTestId('dashboard-news')).toBeInTheDocument();
    expect(screen.getByText('Nouvelles')).toBeInTheDocument();
  });
});
