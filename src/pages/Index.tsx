import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, CheckSquare, Briefcase } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) {
    return null; // Redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">StudyCubs HR</h1>
                <p className="text-sm text-primary-foreground/80">Employee Management System</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Modern HR Management
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Made Simple
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your HR processes with our comprehensive employee management system. 
            From onboarding to performance tracking, we've got you covered.
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            size="lg" 
            className="btn-primary text-lg px-8 py-4"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">Everything You Need</h3>
          <p className="text-muted-foreground">Comprehensive HR tools in one platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-studycubs">
            <CardHeader>
              <div className="bg-gradient-primary p-3 rounded-xl w-fit">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Employee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage employee profiles, track performance, and handle onboarding with ease.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-studycubs">
            <CardHeader>
              <div className="bg-gradient-secondary p-3 rounded-xl w-fit">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Offer Letters</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create, send, and track offer letters with automated workflows and templates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-studycubs">
            <CardHeader>
              <div className="bg-studycubs-teal p-3 rounded-xl w-fit">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Assign and track HR tasks, deadlines, and project progress in real-time.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-studycubs">
            <CardHeader>
              <div className="bg-studycubs-orange p-3 rounded-xl w-fit">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Document Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Store, organize, and share HR documents securely with version control.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your HR?</h3>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of companies that trust StudyCubs for their HR needs
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
          >
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
