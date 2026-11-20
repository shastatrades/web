// web/src/enums/trades.enum.ts

import { Enum } from '@enum'
import svgHvac from '@src/svg/hvac.html?raw'
import svgTree from '@src/svg/tree.html?raw'
import svgDoor from '@src/svg/door.html?raw'
import svgRoof from '@src/svg/roof.html?raw'
import svgTile from '@src/svg/tile.html?raw'
import svgFence from '@src/svg/fence.html?raw'
import svgFaucet from '@src/svg/faucet.html?raw'
import svgWindow from '@src/svg/window.html?raw'
import svgStairs from '@src/svg/stairs.html?raw'
import svgGarage from '@src/svg/garage.html?raw'
import svgDrywall from '@src/svg/drywall.html?raw'
import svgPlumbing from '@src/svg/plumbing.html?raw'
import svgShoveling from '@src/svg/shoveling.html?raw'
import svgSpoonFork from '@src/svg/spoonFork.html?raw'
import svgWaterDrop from '@src/svg/waterDrop.html?raw'
import svgElectrical from '@src/svg/electrical.html?raw'
import svgFoundation from '@src/svg/foundation.html?raw'
import svgPaintRoller from '@src/svg/paintRoller.html?raw'


export const enumTrades = new Enum([
  {
    id: 1,
    icon: svgFaucet,
    value: 'Bathroom',
    slug: 'bathroom',
    description: `We'll turn your bathroom into a spa-like retreat with elegant tile work, new vanity installations and/or shower system upgrades that maximize both style and function.`
  },
  {
    id: 2,
    icon: svgTree,
    value: 'Carpentry',
    slug: 'carpentry',
    description: `We'll turn lumber yard wood or wood that's headed to the landfill into beauty (tables, planters, etc.).`
  },
  {
    id: 3,
    icon: svgDrywall,
    value: 'Cobb Interior',
    slug: 'cobbInterior',
    description: `We'll coat your interior walls with a smooth cobb plaster (think of it as "painting with earth"). This natural, non structural finish is fire, mold and pest resistant, helps regulate indoor humidity and is non-toxic. The result is a warm, organic texture that brings depth and beauty to your room.`
  },
  {
    id: 4,
    icon: svgGarage,
    value: 'Cobb Siding',
    slug: 'cobbSiding',
    description: `We'll clad your home's exterior with beautiful, breathable cobb siding (a natural earthen finish that's fire, mold and pest resistant. Applied as a non structural cladding to add timeless character while protecting your walls from the elements.`
  },
  {
    id: 5,
    icon: svgShoveling,
    value: 'Concrete',
    slug: 'concrete',
    description: `We'll create lasting foundations and surfaces with expert slab pouring, decorative stamped concrete patios and/or crack repairs that restore strength and appearance.`
  },
  {
    id: 6,
    icon: svgStairs,
    value: 'Deck',
    slug: 'deck',
    description: `We'll create your dream outdoor living space with custom deck designs, sturdy railing installations and/or premium wood sealing for years of backyard enjoyment.`
  },
  {
    id: 7,
    icon: svgDoor,
    value: 'Doors',
    slug: 'doors',
    description: `We'll enhance your home's security and curb appeal with custom door installations, precise hardware alignment and/or weather stripping that seals out the elements.`
  },
  {
    id: 8,
    icon: svgDrywall,
    value: 'Drywall',
    slug: 'drywall',
    description: `We'll get your walls looking flawless with seamless patchwork, full room installations and/or custom texture matching that blends perfectly with existing surfaces.`
  },
  {
    id: 9,
    icon: svgElectrical,
    value: 'Electrical',
    slug: 'electrical',
    description: `We'll brighten your home by installing new lighting, upgrading outdated outlets and/or safely running wiring for ceiling fans or home theaters.`
  },
  {
    id: 10,
    icon: svgFence,
    value: 'Fence',
    slug: 'fence',
    description: `We'll install new fencing or address issues like structural instability, material decay, and/or hardware failures.`
  },
  {
    id: 11,
    icon: svgTile,
    value: 'Floors',
    slug: 'floors',
    description: `We'll refresh every step of your home with eco friendly bamboo, durable vinyl and/or cozy carpet.`
  },
  {
    id: 12,
    icon: svgFoundation,
    value: 'Foundation',
    slug: 'foundation',
    description: `We'll secure your home's structural integrity with expert foundation crack repairs, waterproofing solutions, and pier installations that prevent settling and damage.`
  },
  {
    id: 13,
    icon: svgRoof,
    value: 'Gutters',
    slug: 'gutters',
    description: `We'll protect your home from water damage with seamless gutter installations, downspout extensions, and gutter guard systems to keep debris out and water flowing.`
  },
  {
    id: 14,
    icon: svgHvac,
    value: 'HVAC',
    slug: 'hvac',
    description: `We'll keep your home comfortable year-round with professional heating and cooling system installations, efficient ductwork repairs, and smart thermostat integrations that save energy.`
  },
  {
    id: 15,
    icon: svgGarage,
    value: 'Insulation',
    slug: 'insulation',
    description: `We'll insulate your home with sustainable, breathable hemp fiber (a natural alternative that regulates humidity, reduces energy bills, and provides superior acoustic dampening). Made from fast growing hemp, it's carbon negative, naturally pest resistant, and non toxic.`
  },
  {
    id: 16,
    icon: svgSpoonFork,
    value: 'Kitchen',
    slug: 'kitchen',
    description: `We'll transform your kitchen into a culinary showpiece with custom cabinet installation, modern countertop upgrades and/or efficient appliance hookups that flow perfectly.`
  },
  {
    id: 17,
    icon: svgPaintRoller,
    value: 'Painting',
    slug: 'painting',
    description: `We'll refresh your home's interiors and exteriors with expert color consultations, precise surface preparation, and flawless paint application that brings new life to every room.`
  },
  {
    id: 18,
    icon: svgPlumbing,
    value: 'Plumbing',
    slug: 'plumbing',
    description: `We'll clear stubborn clogs, repair leaky faucets and/or upgrade everything.`
  },
  {
    id: 19,
    icon: svgRoof,
    value: 'Roofing',
    slug: 'roofing',
    description: `We'll protect your home from the elements with thorough leak repairs, shingle installation or metal installation.`
  },
  {
    id: 20,
    icon: svgGarage,
    value: 'Siding',
    slug: 'siding',
    description: `We'll restore your home's exterior protection with seamless siding replacements, rot damage fixes and/or color-matched installations that boost curb appeal.`
  },
  {
    id: 21,
    icon: svgTree,
    value: 'Tiling',
    slug: 'tiling',
    description: `We'll add stunning visual appeal with custom backsplash designs, luxurious shower tile installations and/or durable floor tiling that stands up to heavy traffic.`
  },
  {
    id: 22,
    icon: svgWaterDrop,
    value: 'Waterproofing',
    slug: 'waterproofing',
    description: `We'll safeguard your basement and crawl spaces with comprehensive waterproofing, including interior drainage systems, sump pump installations, and vapor barriers to keep moisture out.`
  },
  {
    id: 23,
    icon: svgWindow,
    value: 'Windows',
    slug: 'windows',
    description: `We'll improve your home's efficiency and beauty with seamless glass replacements, stuck window fixes and/or new energy-efficient window installations.`
  }
])
