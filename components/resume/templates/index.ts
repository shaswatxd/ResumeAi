import type { TemplateId } from '@/lib/resume-types'
import type { TP } from '@/components/resume/blocks'
import { AtsProTemplate } from './ats-pro'
import { ModernTemplate } from './modern'
import { CorporateTemplate } from './corporate'
import { MinimalTemplate } from './minimal'
import { ElegantTemplate } from './elegant'
import { ExecutiveTemplate } from './executive'
import { CreativeTemplate } from './creative'
import { DesignerTemplate } from './designer'
import { DeveloperTemplate } from './developer'
import { StudentTemplate } from './student'
import { FresherTemplate } from './fresher'
import { BusinessTemplate } from './business'
import { MarketingTemplate } from './marketing'
import { DarkThemeTemplate } from './dark-theme'
import { TwoColumnTemplate } from './two-column'
import { SingleColumnTemplate } from './single-column'
import { CompactTemplate } from './compact'
import { LuxuryTemplate } from './luxury'
import { ClassicTemplate } from './classic'
import { InternationalTemplate } from './international'

export const TEMPLATE_REGISTRY: Record<TemplateId, (p: TP) => React.ReactNode> = {
  'ats-pro': AtsProTemplate,
  modern: ModernTemplate,
  corporate: CorporateTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  designer: DesignerTemplate,
  developer: DeveloperTemplate,
  student: StudentTemplate,
  fresher: FresherTemplate,
  business: BusinessTemplate,
  marketing: MarketingTemplate,
  'dark-theme': DarkThemeTemplate,
  'two-column': TwoColumnTemplate,
  'single-column': SingleColumnTemplate,
  compact: CompactTemplate,
  luxury: LuxuryTemplate,
  classic: ClassicTemplate,
  international: InternationalTemplate,
}
