import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Share2, Youtube, Twitter, Tag, Brain, Zap, Lock } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Mindly</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="md"
              text="Login"
              onclick={() => navigate("/signin")}
            />
            <Button
              variant="primary"
              size="md"
              text="Get Started"
              onclick={() => navigate("/signup")}
            />
          </div>
        </div>
      </nav>


      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Zap size={16} />
            Your Second Brain for Social Content
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Save, Organize & Share
            <br />
            <span className="text-blue-600">Your Favorite Content</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of YouTube videos and Twitter posts in one beautiful place. 
            Organize with tags, share with anyone, and never lose great content again.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              text="Start Free Today"
              onclick={() => navigate("/signup")}
            />
            <Button
              variant="outline"
              size="lg"
              text="See How It Works"
              onclick={() => {
                document.getElementById('features')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Setup in 30 seconds</span>
            </div>
          </div>
        </div>

   
      </section>


      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600">
            Simple, powerful tools to organize your digital life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
              <Youtube className="text-red-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              YouTube Videos
            </h3>
            <p className="text-gray-600 mb-4">
              Save and embed YouTube videos directly in your collection. Watch them without leaving the app.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Full video embedding
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Supports shorts & regular videos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Add notes & descriptions
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Twitter className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Twitter Posts
            </h3>
            <p className="text-gray-600 mb-4">
              Keep track of important tweets and threads. Never lose that perfect tweet again.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Save tweets & threads
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Quick access to originals
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Organize by topics
              </li>
            </ul>
          </div>


          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Tag className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Smart Organization
            </h3>
            <p className="text-gray-600 mb-4">
              Use tags to categorize your content. Find anything in seconds with powerful search.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Unlimited tags
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Instant search & filter
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Multiple tags per item
              </li>
            </ul>
          </div>


          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Share2 className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Easy Sharing
            </h3>
            <p className="text-gray-600 mb-4">
              Share your entire collection or individual items with a single link. No signup required for viewers.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Public share links
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Toggle sharing on/off
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Share whole brain or items
              </li>
            </ul>
          </div>


          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <Brain className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Your Second Brain
            </h3>
            <p className="text-gray-600 mb-4">
              Build your personal knowledge base. Save insights, learnings, and inspiration in one place.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Beautiful card layout
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Add descriptions & notes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Visual timeline
              </li>
            </ul>
          </div>


          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
              <Lock className="text-yellow-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Private & Secure
            </h3>
            <p className="text-gray-600 mb-4">
              Your content is private by default. You control who sees what with granular sharing controls.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Private by default
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Secure authentication
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Control your data
              </li>
            </ul>
          </div>
        </div>
      </section>


      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sign Up Free
              </h3>
              <p className="text-gray-600">
                Create your account in seconds. No credit card required, no commitment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Save Content
              </h3>
              <p className="text-gray-600">
                Paste YouTube or Twitter links. Add tags and descriptions to organize.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Share & Enjoy
              </h3>
              <p className="text-gray-600">
                Access your content anywhere. Share collections with friends or keep them private.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your Second Brain?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of users organizing their favorite content. 
            Start free, no credit card required.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              text="Get Started Free"
              onclick={() => navigate("/signup")}
            />
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 text-lg font-medium text-white hover:text-blue-100 transition-colors"
            >
              Already have an account? Login →
            </button>
          </div>
        </div>
      </section>


      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-xl font-bold">Brainly</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your second brain for organizing and sharing social content.
            </p>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © 2024 Brainly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}