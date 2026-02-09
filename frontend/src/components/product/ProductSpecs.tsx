import { Package, Ruler, Weight, Palette, Cpu, Battery } from 'lucide-react';
import Accordion from '../ui/Accordion';

interface Props {
  product: {
    id: number;
    name: string;
    category_name: string;
    stock: number;
  };
}

const specs = [
  { icon: <Package size={18} />, label: 'Dimensions', value: '15 x 7.5 x 0.8 cm' },
  { icon: <Weight size={18} />, label: 'Poids', value: '185g' },
  { icon: <Palette size={18} />, label: 'Coloris', value: '5 disponibles' },
  { icon: <Ruler size={18} />, label: 'Taille', value: 'Standard' },
  { icon: <Cpu size={18} />, label: 'Matériau', value: 'Premium composite' },
  { icon: <Battery size={18} />, label: 'Autonomie', value: '48h' },
];

export default function ProductSpecs({ product }: Props) {
  const faqItems = [
    {
      title: 'Politique de retour',
      content: 'Vous disposez de 30 jours après réception pour retourner votre article. Les frais de retour sont gratuits pour la France métropolitaine.',
    },
    {
      title: 'Garantie produit',
      content: 'Ce produit bénéficie d\'une garantie constructeur de 2 ans couvrant les défauts de fabrication. Une extension de garantie est disponible.',
    },
    {
      title: 'Modes de livraison',
      content: 'Livraison standard (3-5 jours) gratuite dès 50€. Livraison express (24h) à 9.99€. Retrait en point relais gratuit.',
    },
    {
      title: 'Moyens de paiement',
      content: 'Nous acceptons CB, Visa, Mastercard, PayPal, Apple Pay, Google Pay et le paiement en 3x sans frais dès 100€ d\'achat.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Specs grid */}
      <div>
        <h4 className="font-bold text-secondary mb-4">Caractéristiques techniques</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2 text-primary mb-2">
                {spec.icon}
                <span className="text-xs font-medium text-muted uppercase tracking-wider">{spec.label}</span>
              </div>
              <p className="font-semibold text-secondary">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details table */}
      <div>
        <h4 className="font-bold text-secondary mb-4">Détails du produit</h4>
        <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
          {[
            ['Référence', `SKU-${product.id.toString().padStart(5, '0')}`],
            ['Catégorie', product.category_name],
            ['Disponibilité', product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'],
            ['Livraison', 'France métropolitaine & DOM-TOM'],
            ['Garantie', '2 ans constructeur'],
            ['Origine', 'Union Européenne'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between px-5 py-3.5">
              <span className="text-sm text-muted">{label}</span>
              <span className="text-sm font-medium text-secondary">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h4 className="font-bold text-secondary mb-4">Questions fréquentes</h4>
        <Accordion items={faqItems} variant="separated" />
      </div>
    </div>
  );
}
