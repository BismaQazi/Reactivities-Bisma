import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment, SegmentInline } from "semantic-ui-react";

export default function NotFound() {
    return(
        <Segment>
            <Header>
                <Icon name='search'/>
                Oops! Could not find this.
            </Header>
            <SegmentInline>
                <Button as={Link} to='/activities' primary>
                    Back to Activities
                </Button>
            </SegmentInline>
        </Segment>
    )
}